const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll((done) => {
  queryInterface.bulkDelete("Organizers")
    .then((response) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Organizer register POST /organizers/register", () => {
  describe("success, Organizer registered", () => {
    test("response Organizer's data", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "organizer@mail.com",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "organizer@mail.com");
        done();
      });
    });
  });
  describe("error, register ", () => {
    test("cannot register Organizer, name is not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "",
        email: "organizer@mail.com",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Name is required"
        ]);
        done();
      });
    });
    test("cannot register Organizer, name is not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "",
        email: "organizer@mail.com",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Name is required"
        ]);
        done();
      });
    });
    test("cannot register Organizer, email is not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
        done();
      });
    });
    test("cannot register Organizer, email is invalid", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "organizer",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Email is invalid"
        ]);
        done();
      });
    });
    test("cannot register Organizer, password is not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "organizer@mail.com",
        password: "",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
        done();
      });
    });
    test("cannot register Organizer, password is invalid", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "organizer@mail.com",
        password: "123456",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Password must contain at least 7 characters and maximum 128 characters"
        ]);
        done();
      });
    });
    test("cannot register Organizer, address in not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "organizer@mail.com",
        password: "1234567",
        address: "",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Address is required"
        ]);
        done();
      });
    });
    test("cannot register Organizer, phone in not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "Organizer",
        email: "organizer@mail.com",
        password: "1234567",
        address: "123 Street",
        phone: ""
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Phone is required"
        ]);
        done();
      });
    });
  });
});

describe("Organizer login POST /organizers/login", () => {
  describe("success, Organizer logged in", () => {
    test("response with access_token", (done) => {
      request(app)
      .post("/organizers/login")
      .send({ email: "organizer@mail.com", password: "1234567" })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      });
    });
  });
  describe("error, login ", () => {
    test("cannot log Organizer in, password is wrong", (done) => {
      request(app)
      .post("/organizers/login")
      .send({email: "organizer@mail.com", password: "1234"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email or password is invalid");
        done();
      });
    });
    test("cannot log Organizer in, email is not in database", (done) => {
      request(app)
      .post("/organizers/login")
      .send({email: "organizer10@mail.com", password: "1234567"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email or password is invalid");
        done();
      });
    });
    test("cannot log Organizer in, no email is provided", (done) => {
      request(app)
      .post("/organizers/login")
      .send({email: "", password: "1234567"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
        done();
      });
    });

    test("cannot log Organizer in, no password is provided", (done) => {
      request(app)
      .post("/admin/login")
      .send({email: "organizer@mail.com", password: ""})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
        done();
      });
    });

    test("cannot log Organizer in, email and password are not provided", (done) => {
      request(app)
      .post("/admin/login")
      .send({email: "", password: ""})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email and password are required");
        done();
      });
    });
  });
});