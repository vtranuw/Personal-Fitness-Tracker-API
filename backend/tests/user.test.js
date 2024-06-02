const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  }, 30000); // Increase the timeout for this test

  it("should not register a user with the same email", async () => {
    await new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    }).save();

    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });

  it("should login a user", async () => {
    const user = new User({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });
    await user.save();

    const res = await request(app).post("/api/users/login").send({
      email: "jane@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  }, 30000); // Increase the timeout for this test

  it("should get user profile", async () => {
    const user = new User({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });
    await user.save();

    const loginRes = await request(app).post("/api/users/login").send({
      email: "jane@example.com",
      password: "password123",
    });

    const token = loginRes.body.token;

    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Jane Doe");
    expect(res.body).toHaveProperty("email", "jane@example.com");
  });
});