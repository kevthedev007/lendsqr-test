const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Create a user
 * @param {Object} createBody
 * @returns {Promise<User>}
 */
const createUser = async (createBody) => {
  const [user] = await db("users").insert(createBody)
  return user;
}

/**
 * Query for user
 * @param {Object} filter - query filter
 * @returns {Promise<QueryResult>}
 */
const queryUser = async (filter) => {
  const user = await db("users").where(filter).first()
  console.log(user)
  return user;
}

const getUserById = async (userId) => {
  const user = await db("users").where({ id: userId }).first();
  return user;
}

const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const comparePassword = async (bodyPassword, userPassword) => {
  return await bcrypt.compare(bodyPassword, userPassword);
}

const createToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY);
  return token;
}


module.exports = {
  createUser,
  queryUser,
  getUserById,
  hashPassword,
  comparePassword
}