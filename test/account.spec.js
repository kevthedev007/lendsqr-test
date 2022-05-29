// process.env.NODE_ENV = 'test';

// const jwt = require("jsonwebtoken")
// const knex = require("../db/db")
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../app');

// let should = chai.should()
// chai.use(chaiHttp);

// // describe('API Routes', function () {

// // });

// let userId = 20;
// let token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY)
// const accounts = {
//   userId,
//   accountName: "kevin seth",
//   accountNumber: "01234567",
// }

// describe("Auth API", () => {
//   beforeEach(function (done) {
//     knex.migrate.rollback()
//       .then(() => {
//         knex.migrate.latest()
//           .then(() => {
//             knex("accounts").insert(accounts)
//               .then(() => {
//                 done();
//               })
//           })
//       })
//   })

//   afterEach(function (done) {
//     knex.migrate.rollback()
//       .then(() => {
//         done();
//       })
//   })

//   describe("POST /deposit", () => {
//     it("add money to account", (done) => {
//       chai.request(server)
//         .post("/account/deposit")
//         .send({
//           amount: 500
//         })
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.should.be.json;
//           res.should.be.a('object');
//           res.body.should.have.property('success');
//           res.body.success.should.equal(true)
//           done();
//         })
//     })
//   })

//   // describe("POST /login", () => {
//   //   it("should login a user", (done) => {
//   //     chai.request(server)
//   //       .post("/auth/login")
//   //       .send({
//   //         email: "kev@gmail.com",
//   //         password: "kevkev"
//   //       })
//   //       .end((err, res) => {
//   //         res.should.have.status(201);
//   //         res.should.be.json;
//   //         res.should.be.a('object');
//   //         res.body.should.have.property('success');
//   //         res.body.success.should.equal(true)
//   //         done();
//   //       })
//   //   })
//   // })

//   // describe("POST /add-account", () => {
//   //   it("should add an account for a user", (done) => {
//   //     chai.request(server)
//   //       .post("/auth/add-account")
//   //       .set("authorization", token)
//   //       .send({
//   //         accountName: "kev dev",
//   //         accountNumber: "0123456789"
//   //       })
//   //       .end((err, res) => {
//   //         res.should.have.status(201);
//   //         res.should.be.json;
//   //         res.should.be.a('object');
//   //         res.body.should.have.property('success');
//   //         res.body.success.should.equal(true)
//   //       })
//   //     done();
//   //   })
//   // })

// })