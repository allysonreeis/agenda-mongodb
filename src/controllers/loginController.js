const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if(req.session.user) return res.render('/');

  // Remove this console.log
  console.log(req.session.user);
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

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save(function(){
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema!');
    req.session.user = login.user;
    req.session.save(function(){
      return res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.render('404');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};