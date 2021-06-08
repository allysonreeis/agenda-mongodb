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

  async login () {
    this.validateFields();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });
    if(!this.user) {
      this.errors.push('Usuário inválido!');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida!');
      this.user = null;
      return;
    }
  }

  async register () {
    this.validateFields();
    if (this.errors.length > 0) return;
    
    this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    const user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push('Usuário já existe!');
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