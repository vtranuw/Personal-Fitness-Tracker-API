const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const Fitness = require("../models/Fitness");

describe("Fitness API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({}); // Ensure no duplicate user issues
    const user = new User({
      name: "Viet Tran",
      email: "viet@example.com",
      password: "password123",
    });
    const savedUser = await user.save();
    userId = savedUser._id;

    const res = await request(app).post("/api/users/login").send({
      email: "viet@example.com",
      password: "password123",
    });

    token = res.body.token;
  });

  beforeEach(async () => {
    await Fitness.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should add a new exercise", async () => {
    const res = await request(app)
      .post("/api/fitness")
      .set("Authorization", `Bearer ${token}`)
      .send({
        exercise: "Running",
        duration: 30,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("exercise", "Running");
  });

  it("should get exercises", async () => {
    const res = await request(app)
      .get("/api/fitness")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });

  it("should update an exercise", async () => {
    const newExercise = new Fitness({
      user: userId,
      exercise: "Running",
      duration: 30,
    });
    await newExercise.save();

    const res = await request(app)
      .put(`/api/fitness/${newExercise._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        exercise: "Swimming",
        duration: 45,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("exercise", "Swimming");
    expect(res.body).toHaveProperty("duration", 45);
  });

  it("should delete an exercise", async () => {
    const newExercise = new Fitness({
      user: userId,
      exercise: "Running",
      duration: 30,
    });
    await newExercise.save();

    const res = await request(app)
      .delete(`/api/fitness/${newExercise._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Exercise removed");
  }, 10000); // Increase the timeout for this test

  it("should handle errors when adding a new exercise", async () => {
    const res = await request(app)
      .post("/api/fitness")
      .set("Authorization", `Bearer ${token}`)
      .send({
        exercise: "",
        duration: 30,
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message", "Server error");
  });

  it("should handle errors when updating a non-existent exercise", async () => {
    const res = await request(app)
      .put(`/api/fitness/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        exercise: "Swimming",
        duration: 45,
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Exercise not found");
  });

  it("should handle errors when deleting a non-existent exercise", async () => {
    const res = await request(app)
      .delete(`/api/fitness/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Exercise not found");
  });

  it("should get total exercise duration", async () => {
    await new Fitness({
      user: userId,
      exercise: "Running",
      duration: 30,
    }).save();

    const res = await request(app)
      .get("/api/fitness/totalDuration")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("totalDuration", 30);
  });
});
