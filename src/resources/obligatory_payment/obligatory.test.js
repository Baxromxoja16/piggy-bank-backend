const supertest = require('supertest');
const app = require('../../app');
const { mongoose } = require('../../loader/dbconnect');
const request = supertest(app);

describe('User testing', () => {
  let token;
  let registered;
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

  const obligatory = {
    userId: null,
    title: 'New Oblig',
    description: 'New desc',
    amount: 5000,
    firstPaymentDate: new Date(),
    lastPaymentDate: new Date(),
    frequency: 44,
  };

  beforeAll(async () => {
    await mongoose.connection.close();
    await mongoose.connect(`mongodb://localhost:27017/test`);
    await mongoose.connection.db.dropCollection('obligatories');
    registered = await request.post('/auth/register').send(customUser);
    obligatory.userId = registered.body.user._id;
    const loginUser = await request.post('/auth/login').send({ email: customUser.email, password: customUser.password });
    token = loginUser.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await request.set('Authorisation', `${token}`).delete(`/user/${registered._id}`);
  });

  describe('Obligatory repository testing', () => {
    it('should create a Obligatory', async () => {
      const newObligatory = await request.post('/obligatory').send(obligatory);
      expect(newObligatory.userId).toBe(obligatory.userId);
      expect(newObligatory.title).toBe(obligatory.title);
      expect(newObligatory.description).toBe(obligatory.description);
      expect(newObligatory.amount).toBe(obligatory.amount);
      expect(newObligatory.lastPaymentDate).toBe(obligatory.lastPaymentDate);
      expect(newObligatory.firstPaymentDate).toBe(obligatory.firstPaymentDate);
      expect(newObligatory.frequency).toBe(obligatory.frequency);
    });

    it('should update a Obligatory', async () => {
      let editedObligatory = { ...obligatory, title: 'Edited title', amount: 777, description: 'Edited desc' };
      const newObligatory = await request.put(`/obligatory/${obligatory._id}`).send(editedObligatory);
      expect(newObligatory.title).toBe(editedObligatory.title);
      expect(newObligatory.amount).toBe(editedObligatory.amount);
      expect(newObligatory.description).toBe(editedObligatory.description);
    });

    it('should get all the users', async () => {
      const obligatories = await request.set('Authorisation', `${token}`).get('/obligatory');
      expect(obligatories).toBeInstanceOf(Array);
      expect(obligatories).toContainEqual(newUser);
    });

    it('should get the boligatory by id', async () => {
      const oblig = await request.set('Authorisation', `${token}`).get(`/obligatory/${obligatory._id}`);
      expect(oblig).toEqual(obligatory);
    });

    it('should delete the obligatory by id', async () => {
      await request.delete(`/obligatory/${obligatory._id}`);
      let users = await userRepository.getUserAll();
      users = JSON.parse(JSON.stringify(users));
      expect(users).not.toContainEqual(newUser);
    });
  });
});
