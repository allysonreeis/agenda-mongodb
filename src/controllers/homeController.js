const HomeModel = require('../models/HomeModel');

HomeModel.create({
  name: 'Allyson Reis',
  email: 'contato@email.com'
})
  .then(data => { console.log(data); });

exports.index = (req, res) => {
  return res.render('index');
}