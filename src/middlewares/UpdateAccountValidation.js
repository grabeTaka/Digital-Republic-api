const AccountModel = require("../model/AccountModel");

const UpdateAccountValidation = async (req, res, next) => {
  const { transaction } = req.body;

  if(req.params.transaction_id != null) {
    if (await checkAvailableAmount(req.params.id, transaction)) return res.status(400).json({ error: 'O valor inserido para transferencia é maior do que o disponível em sua conta.' });
  }

  if (transaction < 0 ) return res.status(400).json({ error: 'O valor inserido para depósito está negativo.' });
  if (transaction > 2000 ) return res.status(400).json({ error: 'O valor inserido para depósito deve ser menor que R$ 2000.' });
  else next();
}

async function checkAvailableAmount (account_id, transaction) {
  let isNotAvailable = false
  await AccountModel.findById(account_id)
  .then((result) => {
    if( parseInt(result.balance) < parseInt(transaction) ) isNotAvailable = true
  })

  return isNotAvailable
}

module.exports = UpdateAccountValidation;