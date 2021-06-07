const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  return res.render('login');
};

exports.register = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function(){
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Você foi cadastrado com sucesso!');
    req.session.save(function(){
      return res.redirect('back');
    });
  } catch (error) {
    console.log(error);
    res.render('404');
  }
};