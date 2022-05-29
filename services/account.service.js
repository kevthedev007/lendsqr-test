const db = require("../db/db");

/**
 * Create an account
 * @param {Object} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
  const [account] = await db("accounts").insert(accountBody).returning(["accountName", "accountNumber", "balance"]);
  return account;
}

/**
 * Query for account
 * @param {Object} filter - query filter
 * @returns {Promise<QueryResult>}
 */
const queryAccount = async (filter) => {
  const account = await db("accounts").where(filter).first()
  return account;
}


const getAccountById = async (accountId) => {
  const account = await db("accounts").where({ id: accountId }).first();
  return account;
}

const updateAccount = async (accountId, updateBody, transaction) => {
  if (transaction) {
    const [account] = await db('accounts').where({ id: accountId }).update(updateBody).returning(["id", "accountName", "accountNumber", "balance"]).transacting(transaction);
    return account;
  }
  const [account] = await db('accounts').where({ id: accountId }).update(updateBody).returning(["id", "accountName", "accountNumber", "balance"]);
  return account;
}


module.exports = {
  createAccount,
  queryAccount,
  getAccountById,
  updateAccount,
}