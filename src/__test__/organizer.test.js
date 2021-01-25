const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let organizerTokenA = '';
let OrganizerIdA = 0;
let organizerTokenB = '';
let OrganizerIdB = 0;
let EventId = 0;

const date = new Date();
date.setDate(date.getDate() + 1);
const validDate = date.toISOString().split('T')[0];

afterAll((done) => {
  queryInterface.bulkDelete("Organizers")
    .then((response) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

/* --------------------------------------REGISTER-------------------------------------- */

describe("Organizer register POST /organizers/register", () => {
  describe("success, Organizer registered", () => {
    //register Organizer A
    test("response Organizer's data", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
        email: "organizerA@mail.com",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        OrganizerIdA = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", OrganizerIdA);
        expect(body).toHaveProperty("email", "organizerA@mail.com");
        done();
      });
    });
    //register Organizer B
    test("response Organizer's data", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerB",
        email: "organizerB@mail.com",
        password: "1234567",
        address: "123 Street",
        phone: "0123456789"
      })
      .end((err, res) => {
        const { body, status } = res;
        OrganizerIdB = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", OrganizerIdB);
        expect(body).toHaveProperty("email", "organizerB@mail.com");
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
        email: "organizerA@mail.com",
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
        expect(body).toHaveProperty("message", [
                      "Name is required"
        ]);
        done();
      });
    });
    test("cannot register Organizer, email is not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
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
        expect(body).toHaveProperty("message", ["Email is required"]);
        done();
      });
    });
    test("cannot register Organizer, email is invalid", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
        email: "organizerA",
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
        expect(body).toHaveProperty("message", [
                      "Email is invalid"
        ]);
        done();
      });
    });
    test("cannot register Organizer, password is not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
        email: "organizerA@mail.com",
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
        expect(body).toHaveProperty("message", ["Password is required"]);
        done();
      });
    });
    test("cannot register Organizer, password is invalid", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
        email: "organizerA@mail.com",
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
        expect(body).toHaveProperty("message", [
                      "Password must contain at least 7 characters and maximum 128 characters"
        ]);
        done();
      });
    });
    test("cannot register Organizer, address in not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
        email: "organizerA@mail.com",
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
        expect(body).toHaveProperty("message", [
                      "Address is required"
        ]);
        done();
      });
    });
    test("cannot register Organizer, phone in not provided", (done) => {
      request(app)
      .post("/organizers/register")
      .send({
        name: "OrganizerA",
        email: "organizerA@mail.com",
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
        expect(body).toHaveProperty("message", [
                      "Phone is required"
        ]);
        done();
      });
    });
  });
});

/* --------------------------------------LOGIN-------------------------------------- */

describe("Organizer login POST /organizers/login", () => {
  describe("success, Organizer logged in", () => {
    //get Organizer A's data
    test("response with access_token", (done) => {
      request(app)
      .post("/organizers/login")
      .send({ email: "organizerA@mail.com", password: "1234567" })
      .end((err, res) => {
        const { body, status } = res;
        organizerTokenA = body.access_token;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      });
    });
    //get Organizer B's data
    test("response with access_token", (done) => {
      request(app)
      .post("/organizers/login")
      .send({ email: "organizerB@mail.com", password: "1234567" })
      .end((err, res) => {
        const { body, status } = res;
        organizerTokenB = body.access_token;
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
      .post("/organizers/login")
      .send({email: "organizerA@mail.com", password: ""})
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
      .post("/organizers/login")
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

/* --------------------------------------CREATE EVENT-------------------------------------- */

describe("create Event POST /organizers/events", () => {
  describe("success, Event created", () => {
    test("create Event using body property", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
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
        OrganizerId: OrganizerIdA,
        EventTypeId: eventTypeId
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", EventId);
        expect(body).toHaveProperty("title", "Event A");
        expect(body).toHaveProperty("date", validDate);
        expect(body).toHaveProperty("time", "18:00:00");
        expect(body).toHaveProperty("location", "Central Park Jakarta");
        expect(body).toHaveProperty("capacity_regular", 1000);
        expect(body).toHaveProperty("price_regular", 100000);
        expect(body).toHaveProperty("price_vip", 300000);
        expect(body).toHaveProperty("price_vvip", 500000);
        expect(body).toHaveProperty("OrganizerId", OrganizerIdA);
        expect(body).toHaveProperty("EventTypeId", eventTypeId);
        done();
      });
    });
  });
  describe("error, create Event", () => {
    test("cannot create Event, no access_token", (done) => {
      request(app)
      .post("/organizers/events")
      .send({
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
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot create Event, no title", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "",
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
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Title is required"]);
        done();
      });
    });
    test("cannot create Event, no date", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: "",
        time: "18:00:00",
        location: "Central Park Jakarta",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Date must be greater than today"]);
        done();
      });
    });
    test("cannot create Event, date is not greater than today", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: "2020-12-31",
        time: "18:00:00",
        location: "Central Park Jakarta",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Date must be greater than today"]);
        done();
      });
    });
    test("cannot create Event, no time", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date:  validDate,
        time: "",
        location: "Central Park Jakarta",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Time is required");
        done();
      });
    });
    test("cannot create Event, no location", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "18:00:00",
        location: "",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Location is required"]);
        done();
      });
    });
    test("cannot create Event, regular capacity must be greater than 0", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "18:00:00",
        location: "Central Park Jakarta",
        capacity_regular: -1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Regular capacity must be greater than 0");
        done();
      });
    });
    test("cannot create Event, regular price cannnot be less than 0", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "18:00:00",
        location: "Central Park Jakarta",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: -100000,
        price_vip: 300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Regular price cannot be less than 0"]);
        done();
      });
    });
    test("cannot create Event, VIP price cannnot be less than 0", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event A",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "18:00:00",
        location: "Central Park Jakarta",
        capacity_regular: 1000,
        capacity_vip: 100,
        capacity_vvip: 50,
        price_regular: 100000,
        price_vip: -300000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["VIP price cannot be less than 0"]);
        done();
      });
    });
    test("cannot create Event, VVIP price cannnot be less than 0", (done) => {
      request(app)
      .post("/organizers/events")
      .set("access_token", organizerTokenA)
      .send({ 
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
        price_vvip: -500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 1
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["VVIP price cannot be less than 0"]);
        done();
      });
    });
  });
});

/* --------------------------------------EDIT EVENT-------------------------------------- */

describe("edit Event PUT /organizers/events/:id", () => {
  describe("success, Event edited", () => {
    test("edit Event using body property", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", EventId);
        expect(body).toHaveProperty("title", "Event B");
        expect(body).toHaveProperty("date", validDate);
        expect(body).toHaveProperty("time", "19:00:00");
        expect(body).toHaveProperty("location", "Central Park Jakarta");
        expect(body).toHaveProperty("capacity", 2000);
        expect(body).toHaveProperty("price_regular", 200000);
        expect(body).toHaveProperty("price_vip", 350000);
        expect(body).toHaveProperty("price_vvip", 500000);
        expect(body).toHaveProperty("OrganizerId", OrganizerIdA);
        expect(body).toHaveProperty("EventTypeId", 2);
        done();
      });
    });
  });
  describe("error, edit Event", () => {
    test("cannot edit Event, no access_token", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot edit Event, organizer cannot edit other organizers' events", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenB)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdB,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });

    test("cannot create Event, no title", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Title is required");
        done();
      });
    });
    test("cannot create Event, no date", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: "",
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Date is required");
        done();
      });
    });
    test("cannot create Event, date is not greater than today", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: "2020-12-31",
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Date must be greater than today");
        done();
      });
    });
    test("cannot create Event, no time", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Time is required");
        done();
      });
    });
    test("cannot create Event, no location", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Location is required");
        done();
      });
    });
    test("cannot create Event, capacity must be greater than 0", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 0,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Capacity must be greater than 0");
        done();
      });
    });
    test("cannot create Event, regular price cannnot be less than 0", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: -200000,
        price_vip: 350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Regular price is invalid");
        done();
      });
    });
    test("cannot create Event, VIP price cannnot be less than 0", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: -350000,
        price_vvip: 500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "VIP price is invalid");
        done();
      });
    });
    test("cannot create Event, VVIP price cannnot be less than 0", (done) => {
      request(app)
      .put(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .send({ 
        title: "Event B",
        event_preview: "http://example.com/images/12345",
        date: validDate,
        time: "19:00:00",
        location: "Central Park Jakarta",
        capacity: 2000,
        price_regular: 200000,
        price_vip: 350000,
        price_vvip: -500000,
        OrganizerId: OrganizerIdA,
        EventTypeId: 2
      })
      .end((err, res) => {
        const { body, status } = res;
        EventId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "VVIP price is invalid");
        done();
      });
    });
  });
});

/* --------------------------------------DELETE-------------------------------------- */

describe("delete Event DELETE /organizers/events/:id", () => {
  describe("error, delete Event", () => {
    test("cannot delete Event, no access_token", (done) => {
      request(app)
      .delete(`/organizers/events/${EventId}`)
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot delete Event, organizer cannot delete other organizers' events", (done) => {
      request(app)
      .delete(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenB)
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
  });
  describe("success, Event deleted", () => {
    test("delete Event using EventId", (done) => {
      request(app)
      .delete(`/organizers/events/${EventId}`)
      .set("access_token", organizerTokenA)
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Deleted from database");
        done();
      });
    });
  });
});
