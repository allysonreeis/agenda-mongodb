const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
  return res.render('contact', { userContact: {} });
};

exports.register = async function (req, res) {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(()=>{
        res.redirect('back');
      });
      return;
    }
    req.flash('success', 'Contato Cadastrado!');
    req.session.save(()=> res.redirect(`/contato/${contact.contact._id}`));
    return;
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.editContact = async (req, res) => {
  if(!req.params.id) return res.render('404');
  const userContact = await Contact.findContactById(req.params.id);
  if(!userContact) return res.render('404');
  res.render('contact', { userContact });
};