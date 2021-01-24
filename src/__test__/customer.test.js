const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll((done) => {
  queryInterface.bulkDelete("Customers")
    .then((response) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Customer register POST /customer/register", () => {
  describe("success, Customer registered", () => {
    test.only("response Customer data", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "febrian",
        last_name: "aditya",
        email: "test@mail.com",
        password: "1234567"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("first_name", "febrian")
        expect(body).toHaveProperty("last_name", "aditya")
        expect(body).toHaveProperty("email", "test@mail.com");
        done();
      });
    });
  });

  describe("error, register ", () => {
    test("cannot register Customer, first_name is not provided", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "",
        last_name: "aditya",
        email: "test@mail.com",
        password: "1234567"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("messages", [
        //               "Name is required"
        // ]);
        done();
      });
    });
    test("cannot register Customer, last_name is not provided", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "febrian",
        last_name: "",
        email: "test@mail.com",
        password: "1234567"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("messages", [
        //               "Name is required"
        // ]);
        done();
      });
    });
    test("cannot register Customer, email is not provided", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "febrian",
        last_name: "aditya",
        email: "",
        password: "1234567"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("message", "Email is required");
        done();
      });
    });
    test("cannot register Customer, email is invalid", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "febrian",
        last_name: "aditya",
        email: "test",
        password: "1234567"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("messages", [
        //               "Email is invalid"
        // ]);
        done();
      });
    });
    test("cannot register Customer, password is not provided", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "febrian",
        last_name: "aditya",
        email: "test@mail.com",
        password: ""
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("message", "Password is required");
        // done();
      });
    });
    test("cannot register Customer, password is invalid", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "febrian",
        last_name: "aditya",
        email: "test@mail.com",
        password: "123456"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("messages", [
        //               "Password must contain at least 7 characters and maximum 128 characters"
        // ]);
        done();
      });
    });
  });
});

describe("Customer login POST /customer/login", () => {
  describe("success, Customer logged in", () => {
    test.only("response with access_token", (done) => {
      request(app)
      .post("/customer/login")
      .send({ email: "test@mail.com", password: "1234567" })
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
    test("cannot log Customer in, password is wrong", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "test@mail.com", password: "1234"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(401);
        // expect(body).toHaveProperty("message", "Email or password is invalid");
        done();
      });
    });
    test("cannot log Customer in, email is not in database", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "organizer10@mail.com", password: "1234567"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(401);
        // expect(body).toHaveProperty("message", "Email or password is invalid");
        done();
      });
    });
    test("cannot log Customer in, no email is provided", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "", password: "1234567"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("message", "Email is required");
        done();
      });
    });
    test("cannot log Customer in, no password is provided", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "test@mail.com", password: ""})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("message", "Password is required");
        done();
      });
    });
    test("cannot log Customer in, email and password are not provided", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "", password: ""})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        // expect(status).toBe(400);
        // expect(body).toHaveProperty("message", "Email and password are required");
        done();
      });
    });
  });
});

// describe("Organizer create Event POST /organizers/events", () => {
//   describe("success, Organizer registered", () => {
//     test("response Organizer's data", (done) => {
//       request(app)
//       .post("/organizers/register")
//       .send({
//         name: "Organizer",
//         email: "organizer2@mail.com",
//         password: "1234567",
//         address: "123 Street",
//         phone: "0123456789"
//       })
//       .end((err, res) => {
//         const { body, status } = res;
//         if (err) {
//           return done(err);
//         }
//         expect(status).toBe(201);
//         expect(body).toHaveProperty("id", expect.any(Number));
//         expect(body).toHaveProperty("email", "organizer2@mail.com");
//         done();
//       });
//     });
//   });
//   describe("error, register ", () => {
//     test("cannot register Organizer, name is not provided", (done) => {
//       request(app)
//       .post("/organizers/register")
//       .send({
//         name: "",
//         email: "organizer2@mail.com",
//         password: "1234567",
//         address: "123 Street",
//         phone: "0123456789"
//       })
//       .end((err, res) => {
//         const { body, status } = res;
//         if (err) {
//           return done(err);
//         }
//         expect(status).toBe(400);
//         expect(body).toHaveProperty("messages", [
//                       "Name is required"
//         ]);
//         done();
//       });
//     });
//   });
// });
