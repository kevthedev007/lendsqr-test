const AccountService = require("../services/account.service");
const TransactionService = require("../services/transaction.service")
const createError = require('http-errors');
const db = require("../db/db");

const fundAccount = async (req, res, next) => {
  try {
    const { amount } = req.body;

    await db.transaction(async trx => {
      const account = await AccountService.queryAccount({ userId: req.user.id });

      if (!account) {
        throw createError.NotFound({
          success: false,
          message: "Account Not found, please add an account Number."
        })
      }

      const updatedAccount = await AccountService.updateAccount(account.id, {
        balance: account.balance + amount
      },
        trx,
      )

      await TransactionService.addToTransaction({
        transactionType: "deposit",
        amount,
        userId: req.user.id,
      },
        trx,
      )

      return res.status(201).json({
        success: true,
        updatedAccount,
        message: "Account funded successfully"
      })
    })
  } catch (error) {
    next(error)
  }
}

const transferFund = async (req, res, next) => {
  try {
    const { amount, accountNumber } = req.body;

    await db.transaction(async trx => {
      const account = await AccountService.queryAccount({ userId: req.user.id });
      if (!account) {
        throw createError.NotFound({
          success: false,
          message: "Account Not found, please add an account Number."
        })
      }

      const transferAccount = await AccountService.queryAccount({ accountNumber })

      if (!transferAccount) {
        throw createError.NotFound({
          success: false,
          message: "Account number does not exist, please check account."
        })
      }

      if (account.accountNumber == transferAccount.accountNumber) {
        throw createError.Conflict({
          success: false,
          message: "Cannot transfer to own account."
        })
      }

      if (account.balance < amount) {
        throw createError.NotAcceptable({
          success: false,
          message: "Insufficient fund available for transfer"
        })
      }

      const withdrawalAccount = await AccountService.updateAccount(account.id, {
        balance: account.balance - amount
      },
        trx,
      )

      const fundedAccount = await AccountService.updateAccount(transferAccount.id, {
        balance: transferAccount.balance + amount
      },
        trx,
      );

      await TransactionService.addToTransaction({
        transactionType: "transfer",
        amount,
        userId: req.user.id,
      },
        trx,
      )

      return res.status(201).json({
        success: true,
        withdrawalAccount,
        message: "Funds transfered successfully"
      })
    })
  } catch (error) {
    next(error)
  }
}

const withdraw = async (req, res, next) => {
  try {
    const { amount } = req.body;

    await db.transaction(async trx => {
      const account = await AccountService.queryAccount({ userId: req.user.id });

      if (!account) {
        throw createError.NotFound({
          success: false,
          message: "Account Not found, please add an account Number."
        })
      }

      if (account.balance < amount) {
        throw createError.NotAcceptable({
          success: false,
          message: "Insufficient fund available for withdrawal"
        })
      }
      const updatedAccount = await AccountService.updateAccount(account.id, {
        balance: account.balance - amount
      })

      await TransactionService.addToTransaction({
        transactionType: "withdrawal",
        amount,
        userId: req.user.id,
      },
        trx,
      )

      return res.status(201).json({
        success: true,
        updatedAccount,
        message: "Money withdrawn successfully"
      })
    })
  } catch (error) {
    next(error)
  }
}

const checkBalance = async (req, res, next) => {
  try {
    const account = await AccountService.queryAccount({ userId: req.user.id })
    return res.status(201).json({
      success: true,
      account,
      message: "Money withdrawn successfully"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fundAccount,
  transferFund,
  withdraw,
  checkBalance,
}