const db = require("../db/db");

/**
 * Create an account
 * @param {Object} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
  const [account] = await db("accounts").insert(accountBody)
  return await getAccountById(account)
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
    await db('accounts').where({ id: accountId }).update(updateBody).transacting(transaction);
    return await db('account').whereIn('id', accountId);
  }
  await db('accounts').where({ id: accountId }).update(updateBody)
  return await db('account').whereIn('id', accountId);
}


module.exports = {
  createAccount,
  queryAccount,
  getAccountById,
  updateAccount,
}