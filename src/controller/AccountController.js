const AccountModel = require("../model/AccountModel");

class AccountController {
	async create(req, res) {
		const accountRequest = new AccountModel(req.body);
		await accountRequest
			.save()
			.then((result) => {
				return res.status(200).json(result);
			}).catch((err) => {
				return res.status(500).json(err);
			});
	}

  async update(req, res) { 
    await AccountModel.findById(req.params.id)
    .then(async (resultAccountModel) => {

      await AccountModel.findByIdAndUpdate(
        { '_id': resultAccountModel._id.toString() },
        { 'balance': resultAccountModel.balance + req.body.transaction },
      ).then((result) => {
        return res.status(200).json(result);
      })

    }).catch((err) => {
      return res.status(500).json(err);
    });
  }

  async bankTransaction(req, res) {
    await AccountModel.findById(req.params.id)
    .then(async (resultAccountModel) => {
      await AccountModel.findByIdAndUpdate(
        { '_id': resultAccountModel._id.toString() },
        { 'balance': resultAccountModel.balance - req.body.transaction },

      )}).catch((err) => {
      return res.status(500).json(err);
    });

    await AccountModel.findById(req.params.transaction_id)
    .then(async (resultAccountModel) => {
      await AccountModel.findByIdAndUpdate(
        { '_id': resultAccountModel._id.toString() },
        { 'balance': resultAccountModel.balance + req.body.transaction },

      )}).catch((err) => {
      return res.status(500).json(err);
    });

    return res.status(200).json("Transferência realizada com sucesso!");
  }
}

module.exports = new AccountController();