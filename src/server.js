require('dotenv').config();
const PORT = 3000;

//const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path');
const routes = require('./routes');
const express = require('express');
const app = express();
const { globalMiddleware, checkCsrfToken, csrfMiddleware } = require('./middlewares/middleware');

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
  })
  .then(() => {
    app.emit('connected');
  })
  .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flashMessages = require('connect-flash');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const sessionOptions = session({
  secret: 'sdfsf5AsfA5sfAs4',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flashMessages());
app.use(globalMiddleware);
app.use(csrf());
app.use(checkCsrfToken);
app.use(csrfMiddleware);
app.use(routes);

app.on('connected', ()=>{
  app.listen(PORT, ()=>{ 
    console.log(`Server is running!`);
    console.log(`Access http://localhost:${PORT}`);
  });
});