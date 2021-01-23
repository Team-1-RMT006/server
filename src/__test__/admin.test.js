const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

afterAll((done) => {
  queryInterface.bulkDelete("Admins", {}, { logging: false })
    .then(response => {
      done()
    })
    .catch(error => {
      done(error)
    })
})

describe("Register Admin", () => {
  test("response with data", (done) => {
    request(app)
      .post("/admin/register")
      .send({ email: "admin@mail.com", password: "123456" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(201)
        expect(body).toHaveProperty("email", "admin@mail.com")
        done()
      })
  }),
  test("response with email and password required", (done) => {
    request(app)
      .post("/admin/register")
      .send({ email: "", password: "" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email and password are required")
        done()
      })
  }),
  test("response with email is required", (done) => {
    request(app)
      .post("/admin/register")
      .send({ email: "", password: "123456" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email is required")
        done()
      })
  }),
  test("response with email is required", (done) => {
    request(app)
      .post("/admin/register")
      .send({ email: "admin1@mail.com", password: "" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Password is required")
        done()
      })
  }),
  test("response with email is unique", (done) => {
    request(app)
      .post("/admin/register")
      .send({ email: "admin@mail.com", password: "123456" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email has already use")
        done()
      })
  })
})

describe("Login Admin", () => {
  test("response with access token", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: "admin@mail.com", password: "123456" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(200)
        expect(body).toHaveProperty("access_token", expect.any(String))
        done()
      })
  }),
  test("response with email and password required", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: "", password: "" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email and password are required")
        done()
      })
  }),
  test("response with email required", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: "", password: "12345" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email is required")
        done()
      })
  }),
  test("response with password required", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: "admin@mail.com", password: "" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Password is required")
        done()
      })
  }),
  test("response with email or password incorrect", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: "admin@mail.com", password: "aaaaaaa" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email or password incorrect")
        done()
      })
  }),
  test("response with invalid account", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: "admin5@mail.com", password: "12345" })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid account")
        done()
      })
  })
})