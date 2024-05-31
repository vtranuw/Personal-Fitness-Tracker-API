const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Fitness = require('../models/Fitness');

describe('Fitness API', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    await user.save();

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    token = res.body.token;
  });

  beforeEach(async () => {
    await Fitness.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should add a new exercise', async () => {
    const res = await request(app)
      .post('/api/fitness')
      .set('Authorization', `Bearer ${token}`)
      .send({
        exercise: 'Running',
        duration: 30,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('exercise', 'Running');
  });

  it('should get exercises', async () => {
    const res = await request(app)
      .get('/api/fitness')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });
}, 10000); // Set a longer timeout for tests if necessary
