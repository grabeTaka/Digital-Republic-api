const AccountModel = require("../model/AccountModel");

const CreateAccountValidation = async (req, res, next) => {
  const { cpf, name, balance } = req.body;
  if (!cpf) return res.status(403).json({ error: 'CPF é obrigatório para abrir uma conta.' });
  else if (!cpfValidator(cpf)) return res.status(403).json({ error: 'Ops, parece que voce inseriu um cpf inválido' });
  else if (!name) return res.status(403).json({ error: 'Nome é obrigatório para abrir uma conta.' });
  else if (await accountValidator(cpf)) return res.status(409).json({ error: 'Ops, parece que ja existe uma conta cadastrada com esse CPF' });
  else if (!balanceValidator(balance)) return res.status(400).json({ error: 'Atenção, o valor inserido no balanço está negativo.' });
  else next();
}

function cpfValidator(cpf) {
  var sum;
  var rest;
  cpf = cpf.toString()

  sum = 0;
  if (cpf == "00000000000") return false;

  for (i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function balanceValidator(balance) {
  if (balance != undefined && balance < 0 ) return false
  else return true
}

async function accountValidator(cpf) {
  let accountExists = false

  await AccountModel.find({ "cpf": cpf })
  .then((result) => {
    if (result.length > 0) accountExists = true;
  })

  return accountExists
}

module.exports = CreateAccountValidation;