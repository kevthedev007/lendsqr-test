const db = require("../db/db");

const addToTransaction = async (payload, trx) => {
  const [transaction] = await db("transactions").insert(payload).returning(["id", "transactionType", "amount"]).transacting(trx)
  return transaction;
}

module.exports = {
  addToTransaction,
}