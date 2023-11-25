const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const User = require('../models/userModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  let userId;

  beforeEach(async () => {
    // Clear the database and add a sample user before each test
    await User.deleteMany({});
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
    });
    await user.save();
    userId = user._id;
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by ID', async () => {
      const res = await chai.request(app).get(`/api/users/${userId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id').eql(userId.toString());
      expect(res.body).to.have.property('username').eql('testuser');
      expect(res.body).to.have.property('email').eql('test@example.com');
    });

    it('should return 404 if user ID is not found', async () => {
      const user = new User({
        username: 'sample',
        email: 'sample@example.com',
      });

      const res = await chai.request(app).get(`/api/users/${user._id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').eql('User not found');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('username').eql('newuser');
      expect(res.body).to.have.property('email').eql('newuser@example.com');
    });

    it('should return 400 if user with the same email already exists', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .send({
          username: 'testuser',
          email: 'test@example.com',
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').eql('User with this email already exists');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user details', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${userId}`)
        .send({
          username: 'updateduser',
          email: 'updateduser@example.com',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username').eql('updateduser');
      expect(res.body).to.have.property('email').eql('updateduser@example.com');
    });

    it('should update profile picture', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${userId}`)
        .attach('profilePicture', Buffer.from('fake-image-data'), 'test.png');

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('profilePicture').to.be.a('string');
    });

    it('should return 404 if user ID is not found', async () => {
      const user = new User({
        username: 'sample',
        email: 'sample@example.com',
      });

      const res = await chai.request(app)
        .put(`/api/users/${user._id}`)
        .send({
          username: 'updateduser',
          email: 'updateduser@example.com',
        });

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').eql('User not found');
    });
  });
});
