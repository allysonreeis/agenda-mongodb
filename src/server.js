const PORT = 3000;

const path = require('path');
const routes = require('./routes');
const express = require('express');
const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(routes);

app.listen(PORT, ()=>{ 
  console.log(`Server is running!`);
  console.log(`Access http://localhost:${PORT}`);
});