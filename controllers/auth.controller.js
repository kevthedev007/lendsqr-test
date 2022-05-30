const UserService = require("../services/user.service");
const AccountService = require("../services/account.service")
const createError = require('http-errors');

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, password } = req.body;
    const email = req.body.email.toLowerCase();

    const emailExists = await UserService.queryUser({ email });

    if (emailExists) {
      throw createError.Conflict({
        success: false,
        message: "Email already linked to existing registration"
      })
    }

    const hashedPassword = await UserService.hashPassword(password);

    const newUser = await UserService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    const token = await UserService.createToken(newUser.id)

    return res.status(201).json({
      success: true,
      token,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      },
      message: "User created successfully"
    })
  } catch (error) {
    next(error)
  }
}

const addAccount = async (req, res, next) => {
  try {
    const { accountName, accountNumber } = req.body;

    //check if user already has an account registered
    const checkAccount = await AccountService.queryAccount({ userId: req.user.id })

    if (checkAccount) {
      throw createError.Conflict({
        success: false,
        message: "User is already linked to an account"
      })
    }

    const accountExists = await AccountService.queryAccount({ accountNumber });

    if (accountExists) {
      throw createError.Conflict({
        success: false,
        message: "Account Number is linked to another user account"
      })
    }

    // save to database
    const createAccount = await AccountService.createAccount({
      accountName,
      accountNumber,
      userId: req.user.id
    })
    //send userId token back
    const token = await UserService.createToken(req.user.id)

    return res.status(201).json({
      success: true,
      token,
      createAccount,
      message: "Account added successfully"
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {

  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    //check if email exists
    const user = await UserService.queryUser({ email });
    if (!user) {
      throw createError.NotFound({
        success: false,
        message: "User not found, please register an account"
      })
    }

    const validPass = await UserService.comparePassword(password, user.password);

    if (!validPass) {
      throw createError.Unauthorized({
        success: false,
        message: "Invalid Password"
      })
    }

    const token = await UserService.createToken(user.id)

    return res.status(201).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token,
      message: "Logged in"
    })
  } catch (error) {
    next(error)
  }

}

module.exports = {
  register,
  addAccount,
  login,
}