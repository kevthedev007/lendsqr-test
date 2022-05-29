const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const app = express();

//importing routes
let authRoute = require("./routes/auth.route")
let accountRoute = require("./routes/account.route")
//adding middlewares
app.use(cors({
  origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false, limit: '60mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

//routes
app.get('/', (req, res) => {
  res.json("Lendsqr test API")
})
app.use("/auth", authRoute)
app.use("/account", accountRoute)

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

let port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started at port ${port}`)
})

module.exports = app;
