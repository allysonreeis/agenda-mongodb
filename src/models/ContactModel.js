const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  static async findContactById (id) {
    if(typeof id !== 'string') return;
    const userContact = await ContactModel.findById(id);
    return userContact;
  }

  static async searchContacts () {
    const userContacts = await ContactModel.find()
      .sort({ createdAt: -1 });
    return userContacts;
  }

  static async deleteContact (id) {
    if(typeof id !== 'string') return;
    const userContact = await ContactModel.findOneAndDelete({ _id: id });
    return userContact;
  }

  async register() {
    this.validateFields();
    if(this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  validateFields () {
    this.cleanUp();
    // Short-circuit
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
    if(!this.body.name) this.errors.push('O nome é obrigatório!');
    if(!this.body.email && !this.body.phone) {
      this.errors.push('Ao menos um contato deve ser preenchido (Telefone e/ou Email).');
    }
  }

  cleanUp () {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      phone: this.body.phone,
    };
  }

  async edit (id) {
    if(typeof id !== 'string') return;
    this.validateFields();
    if(this.errors.length > 0 ) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }
}

module.exports = Contact;