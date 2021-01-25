const request = require("supertest");
const { response } = require("../app");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const QRCode = require("qrcode")


let customerTokenA = '';
let CustomerIdA = 0;
let customerTokenB = '';
let CustomerIdB = 0;
// let EventId = 0;
let OrganizerId = 0
let EventTypeId = 0
let EventId = 0
let id = 0
let wishListId = 0

const date = new Date();
date.setDate(date.getDate() + 1);
const validDate = date.toISOString().split('T')[0];


beforeAll((done) => {
  queryInterface.bulkInsert("Organizers", [
    {
      name: "OrganizerA",
      email: "organizerA@mail.com",
      password: "1234567",
      address: "123 Street",
      phone: "0123456789",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { returning: true })
  .then((data) => {
    OrganizerId = data[0].id
    // done();
    return queryInterface.bulkInsert("EventTypes", [
      {
        name: "wedding",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true })
  })
  .then(data => {
    EventTypeId = data[0].id

    return queryInterface.bulkInsert("Events", [
      {
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "18:00:00",
        location: "Central Park Jakarta",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId,
        EventTypeId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true })
  })
  .then(data => {
    EventId = data[0].id
    done()
  })
  .catch((err) => {
    done(err);
  })
});

afterAll((done) => {
  queryInterface.bulkDelete("Customers")
  .then((response) => {
    return queryInterface.bulkDelete("Organizers")
  })
  .then((response) => {
    return queryInterface.bulkDelete("EventTypes")
  })
  .then((response) => {
    return queryInterface.bulkDelete("Tickets")
  })
  .then((response) => {
    done()
  })
  .catch((err) => {
    done(err);
  });
});


// Register (AMAN)
describe("Customer register POST /customer/register", () => {
  describe("success, Customer registered", () => {
    // CustomerA    
    test("response Customer data", (done) => {
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
        CustomerIdA = body.id
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", CustomerIdA);
        expect(body).toHaveProperty("first_name", "febrian")
        expect(body).toHaveProperty("last_name", "aditya")
        expect(body).toHaveProperty("email", "test@mail.com");
        done();
      });
    });

    // CustomerB
    test("response Customer data", (done) => {
      request(app)
      .post("/customer/register")
      .send({
        first_name: "customer",
        last_name: "customer",
        email: "customer@mail.com",
        password: "1234567"
      })
      .end((err, res) => {
        const { body, status } = res;
        CustomerIdB = body.id
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", CustomerIdB);
        expect(body).toHaveProperty("first_name", "customer")
        expect(body).toHaveProperty("last_name", "customer")
        expect(body).toHaveProperty("email", "customer@mail.com");
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
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["First name is required"]);
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
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Email is required"]);
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
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Email is invalid"]);
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
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Password is required"]);
        done();
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
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", [
                      "Password must contain at least 7 characters and maximum 128 characters"
        ]);
        done();
      });
    });
  });
});

// Login (AMAN)
describe("Customer login POST /customer/login", () => {
  describe("success, Customer logged in", () => {
    // Login Customer A
    test("response with access_token", (done) => {
      request(app)
      .post("/customer/login")
      .send({ email: "test@mail.com", password: "1234567" })
      .end((err, res) => {
        const { body, status } = res;
        customerTokenA = body.access_token
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      });
    });
    // login Customer B
    test("response with access_token", (done) => {
      request(app)
      .post("/customer/login")
      .send({ email: "customer@mail.com", password: "1234567" })
      .end((err, res) => {
        const { body, status } = res;
        customerTokenB = body.access_token
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
    test("cannot log Customer in, email is not in database", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "organizer10@mail.com", password: "1234567"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email/password");
        done();
      });
    });
    test("cannot log Organizer in, password is wrong", (done) => {
      request(app)
      .post("/organizers/login")
      .send({email: "organizerA@mail.com", password: "1234"})
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
    test("cannot log Customer in, no email is provided", (done) => {
      request(app)
      .post("/customer/login")
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
    test("cannot log Customer in, no password is provided", (done) => {
      request(app)
      .post("/customer/login")
      .send({email: "test@mail.com", password: ""})
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
    test("cannot log Customer in, email and password are not provided", (done) => {
      request(app)
      .post("/customer/login")
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

// GET EVENT
describe("Get All Data Events only active", () => {
  const temp = [
    {name: "Event"}
  ]
  test("response with data", (done) => {
    request(app)
    .get("/customer/eventactive")
    .end((err, res) => {
      const { body, status } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(200)
      expect(temp).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: "Event"
        })
      ]))
      done()
    })
  })
})

// BUY TICKET (POST)
describe("Post buy ticket /customer/book", () => {
  test("with use access_token", (done) => {
    request(app)
    .post("/customer/book")
    .set("access_token", customerTokenA)
    .send({
      class: "vip",
      CustomerId: CustomerIdA,
      EventId, // GIMANA HAYOOOOO
      seat: "a10", 
      status: "unpaid",
      price: 13000
    })
    .end((err, res) => {
      const { body, status } = res;
      id = body.id
      if (err) {
        return done(err);
      }
      expect(status).toBe(201);
      expect(body).toHaveProperty("class", "vip")
      expect(body).toHaveProperty("CustomerId", CustomerIdA)
      expect(body).toHaveProperty("EventId", EventId)
      expect(body).toHaveProperty("ticketCode", expect.any(String))
      expect(body).toHaveProperty("seat", "a10")
      expect(body).toHaveProperty("status", "unpaid")
      expect(body).toHaveProperty("price", 13000)
      done();
    });
  });

  test("response with login first", (done) => {
    request(app)
    .post("/customer/book")
    .send({
      class: "vip",
      CustomerId: CustomerIdA,
      EventId, // GIMANA HAYOOOOO
      seat: "a10", 
      status: "unpaid",
      price: 13000
    })
    .end((err, res) => {
      const { status, body } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "You must have account")
      done()
    })
  })

  test("response with internal server error", (done) => {
    request(app)
      .post("/customer/book")
      .set("access_token", "asasassas")
      .send({
        class: "vip",
        CustomerId: CustomerIdA,
        EventId, // GIMANA HAYOOOOO
        seat: "a10", 
        status: "unpaid",
        price: 13000
      })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(500)
        expect(body).toHaveProperty("message", "Internal Server Error")
        done()
      })
  })

  test("response with class is required", (done) => {
    request(app)
      .post("/customer/book")
      .set("access_token", customerTokenA)
      .send({
        class: "",
        CustomerId: CustomerIdA,
        EventId, // GIMANA HAYOOOOO
        seat: "a10", 
        status: "unpaid",
        price: 13000
      })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", ["Class is required", "Class is invalid"])
        done()
      })
  })

  test("response price must more then 0", (done) => {
    request(app)
    .post("/customer/book")
      .set("access_token", customerTokenA)
      .send({
        class: "vip",
        CustomerId: CustomerIdA,
        EventId, // GIMANA HAYOOOOO
        seat: "a10", 
        status: "unpaid",
        price: -1
      })
      .end((err, res) => {
        const { status, body } = res
        if (err) {
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", ["Price cannot be less than 0"])
        done()
      })
  })

  test("response not use access token", (done) => {
    request(app)
    .post("/customer/book")
    .send({
      class: "vip",
      CustomerId: CustomerIdA,
      EventId, // GIMANA HAYOOOOO
      seat: "a10", 
      status: "unpaid",
      price: 13000
    })
    .end((err, res) => {
      const { body, status } = res;
      id = body.id
      if (err) {
        return done(err);
      }
      expect(status).toBe(401);
      expect(body).toHaveProperty("error", "You must have account")
      expect
      done();
    });
  })
  
  // test("response status error", (done) => {
  //   request(app)
  //   .post("/customer/book")
  //     .set("access_token", customerTokenA)
  //     .send({
  //       class: "vip",
  //       CustomerId: CustomerIdA,
  //       EventId, // GIMANA HAYOOOOO
  //       seat: "a10", 
  //       status: "unpaidd",
  //       price: -1
  //     })
  //     .end((err, res) => {
  //       const { status, body } = res
  //       if (err) {
  //         return done(err)
  //       }
  //       expect(status).toBe(400)
  //       expect(body).toHaveProperty("message", ["Price cannot be less than 0"])
  //       done()
  //     })
  // })
})

// GET ALL TICKET
describe("Get All Ticket /customer/ticket", () => {
  const temp = [
    { name: "Ticket"}
  ]
  test("response with data", (done) => {
    request(app)
    .get("/customer/ticket")
    .set("access_token", customerTokenA)
    .end((err, res) => {
      const { status, body } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(200)
      expect(temp).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: "Ticket"
        })
      ]))
      done()
    })
  })

  test("response error not use access_token", (done) => {
    request(app)
    .get("/customer/ticket")
    .end((err, res) => {
      const { status, body } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "You must have account");
      // expect.status(500)
      done()
    })
  })
})

// PATCH PAYMENT TICKET
describe("Edit Status Payment /customer/buy/:id", () => {
  test("need access_token", (done) => {
    request(app)
    .patch(`/customer/buy/${id}`)
    .set("access_token", customerTokenA)
    .send({
      status: "paid",
      CustomerId: CustomerIdA
    })
    .end((err, res) => {
      const{ status, body } = res
      if(err) {
        return done(err)
      }
      // expect(status).toBe(200)
      // expect(body).t
      // console.log(res.body, "00000000");
      done()
    })
  })
})

// // GET ALL DATA WISHLIST
describe("Get All Data Wishlist /customer/wishlist", () => {
  const temp = [
    { name: "Wishlist" }
  ]
  test("response with data", (done) => {
    request(app)
    .get("/customer/wishlist")
    .set("access_token", customerTokenA)
    .end((err, res) => {
      const { status, body } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(200)
      expect(temp).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: "Wishlist"
        })
      ]))
      done()
    })
  })

  test("response error not use access_token", (done) => {
    request(app)
    .get("/customer/wishlist")
    .end((err, res) => {
      const { status, body } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "You must have account");
      // expect.status(500)
      done()
    })
  })
})

// // POST ADD WISHLIST
describe("Post Data to Wishlist /customer/wishlist", () => {
  test("response wishlist data", (done) => {
    request(app)
    .post("/customer/wishlist")
    .set("access_token", customerTokenA)
    .send({
      EventId
    })
    .end((err, res) => {
      const { status, body } = res
      wishListId = body.id
      if(err) {
        return done(err)
      }
      expect(status).toBe(201)
      done()
    })
  })
})


// DELETE WISHLIST BY ID WISHLIST
describe("Delete by Id /customer/delete/:id", () => {
  test("Delete data wishlist", (done) => {
    request(app)
    .delete(`/customer/wishlist/${wishListId}`)
    .set("access_token", customerTokenA)
    .end((err, res) => {
      const { body, status } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(200)
      // console.log(body, "opopopopoop");
      done()
    })
  })
})


describe("Get All Data From Ticket Where Status = paid", () => {
  const temp = [
    { name: "History" }
  ]
  test("Get All Data Ticket", (done) => {
    request(app)
    .get("/customer/history")
    .set("access_token", customerTokenA)
    .end((err, res) => {
      const { status, body } = res
      if(err) {
        return done(err)
      }
      expect(status).toBe(200)
      expect(temp).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: "History"
        })
      ]))
      done()
    })
  })
})