process.env.NODE_ENV = 'test';

const jwt = require("jsonwebtoken")
const knex = require("../db/db")
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

let should = chai.should()
chai.use(chaiHttp);


let userId = 40;
let token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY)
const users = {
  id: userId,
  firstName: "kevin",
  lastName: "seth",
  email: "kev@gmail.com",
  password: "kevkev",
}

const account = {
  userId,
  accountName: "kev seth",
  accountNumber: "0987654321"
}
describe("Auth API", () => {
  beforeEach(function (done) {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            knex("users").insert(users)
              .then(() => {
                done();
              })
          })
      })
  })

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(() => {
        done();
      })
  })

  describe("POST /register", () => {
    it("should register a user", (done) => {
      chai.request(server)
        .post("/auth/register")
        .send({
          firstName: "family guy",
          lastName: "fox",
          email: "comedy@gmail.com",
          password: "comedy"
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true)
        })
      done();
    })
  })

  describe("POST /add-account", () => {
    it("should add an account for a user", (done) => {
      chai.request(server)
        .post("/auth/add-account")
        .set("authorization", token)
        .send({
          accountName: "kev dev",
          accountNumber: "0123456789"
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true)
        })
      done();
    })
  })

  describe("PATCH /deposit", () => {
    it("add money to account", (done) => {
      chai.request(server)
        .patch("/account/deposit")
        .set("authorization", token)
        .send({
          amount: 500
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true)
        })
      done();
    })
  })

  describe("PATCH /withdraw", () => {
    it("add money to account", (done) => {
      chai.request(server)
        .patch("/account/withdraw")
        .set("authorization", token)
        .send({
          amount: 500
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true)
        })
      done();
    })
  })
})