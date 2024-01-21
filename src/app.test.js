const supertest = require('supertest');
const app = require('./app');
const { mongoose } = require('./loader/dbconnect');

describe('Application testing crud operation', () => {
  const customuser = {
    email: 'asadbek@mail.com',
    password: '12345673',
    role: 'ADMIN',
    firstname: 'Asadbek',
    lastname: 'Raimov',
    gender: 'Male',
    birthday: '2000-03-14T19:31:15.614Z',
    residence: 'Uzbekistan',
  };

  describe('GET /', () => {
    beforeAll(async () => {
      await mongoose.disconnect();
      await mongoose.connect(`mongodb://localhost:27017/test`);
    });

    afterAll(async () => {
      await mongoose.connection.db.dropCollection('users');
      await mongoose.disconnect();
    });

    it('should return Hello World', async () => {
      const response = await supertest(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello World');
    });

    it('POST should register new user and return', async () => {
      const response = await supertest(app).post('/auth/register').send(customuser);
      expect(response.body.email).toBe(customuser.email);
      expect(response.body.password).not.toBe(customuser.password);
      expect(response.body.role).toBe(customuser.role);
      expect(response.body.firstname).toBe(customuser.firstname);
      expect(response.body.lastname).toBe(customuser.lastname);
      expect(response.body.gender).toBe(customuser.gender);
      expect(response.body.birthday).toBe(customuser.birthday);
      expect(response.body.residence).toBe(customuser.residence);
    });

    it('POST should login existing user', async () => {
      const user = await supertest(app).post('/auth/register').send(customuser);
      const response = await supertest(app).post(`/auth/login`).send({
        email: customuser.email,
        password: customuser.password,
      });
      expect(response.body.email).toBe(customuser.email);
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});
