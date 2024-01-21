const supertest = require('supertest');
const app = require('../../app');
const userRepository = require('./user.repository');

const request = supertest(app);
const { mongoose } = require('../../loader/dbconnect');

describe('User testing', () => {
  beforeAll(async () => {
    await mongoose.connection.close();
    await mongoose.connect(`mongodb://localhost:27017/test`);
    await mongoose.connection.db.dropCollection('users');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const customUser = {
    email: 'asadbek@mail.com',
    password: '12345673',
    role: 'ADMIN',
    firstname: 'Asadbek',
    lastname: 'Raimov',
    gender: 'Male',
    birthday: new Date('2000-03-14T19:31:15.614Z'),
    residence: 'Uzbekistan',
  };

  describe('User repository testing', () => {
    let newUser;
    let token;

    beforeEach(async () => {
      const response = await request.post('/auth/register').send(customUser);
      newUser = response.body;
      // const response = await request.post('/auth/login').send({email: customUser.email, password: customUser.password});
      // token = response.body.token;
    });

    afterEach(async () => {
      await request.delete(`/user/${newUser._id}`);
    });

    it('should update a user', async () => {
      let editedUser = { ...customUser, firstname: 'Jorj', lastname: 'Washington', role: 'USER' };
      let user = await userRepository.editUser(newUser._id, editedUser);
      user = JSON.parse(JSON.stringify(user));
      expect(user.firstname).toBe(editedUser.firstname);
      expect(user.lastname).toBe(editedUser.lastname);
      expect(user.role).toBe(editedUser.role);
    });

    it('should get all the users', async () => {
      let users = await userRepository.getUserAll();
      users = JSON.parse(JSON.stringify(users));
      expect(users).toBeInstanceOf(Array);
      expect(users).toContainEqual(newUser);
    });

    it('should get the users by id', async () => {
      let user = await userRepository.getUserByID(newUser._id);
      user = JSON.parse(JSON.stringify(user));
      expect(user).toEqual(newUser);
    });

    it('should delete the user by id', async () => {
      await userRepository.removeUser(newUser._id);
      let users = await userRepository.getUserAll();
      users = JSON.parse(JSON.stringify(users));
      expect(users).not.toContainEqual(newUser);
    });
  });
});
