const express = require("express");
const router = express.Router();

const AccountController = require("../controller/AccountController");
const CreateAccountValidation = require("../middlewares/CreateAccountValidation");
const UpdateAccountValidation = require("../middlewares/UpdateAccountValidation");

router.post('/', CreateAccountValidation, AccountController.create);
router.put('/:id', UpdateAccountValidation, AccountController.update);
router.put('/:id/transaction/:transaction_id', UpdateAccountValidation, AccountController.bankTransaction);

module.exports = router;