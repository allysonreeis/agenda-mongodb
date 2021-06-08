const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor (body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register () {
    this.validateFields();
    if (this.errors.length > 0) return;
    
    this.userExists();
    if (this.errors.length > 0) return;

    try {
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      const user = await LoginModel.create(this.body);
    } catch (error) {
      console.log(error);
    }
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if(user) this.errors.push('Usuário já existe!');
  }

  validateFields () {
    this.cleanUp();
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
  }

  cleanUp () {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;