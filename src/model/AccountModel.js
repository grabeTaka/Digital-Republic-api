const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  cpf: { type: Number, required: true },
  name: { type: String, required: true },
  balance: { type: Number, required: false, default: 0 }
});

module.exports = mongoose.model('Account', AccountSchema);