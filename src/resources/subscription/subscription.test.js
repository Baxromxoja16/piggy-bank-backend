const supertest = require('supertest');
const app = require('../');
const { mongoose } = require('../../loader/dbconnect');

const request = supertest(app);

describe('User testing', () => {
  beforeAll(async () => {
    await mongoose.connection.close();
    await mongoose.connect('mongodb://localhost:27017/test');
    await mongoose.connection.db.dropCollection('subscriptions');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  //   const subscription = {
  //       account_id: ,
  //       title: ,
  //       description: ,
  //       first_day_payment: ,
  //       last_day_payment: ,
  //       day_of_payment: ,
  //       category: ,
  //       amount: ,
  //       currency: ,
  //   }

  describe('User repository testing', () => {
    let newSubscription;

    beforeEach(async () => {
      const response = await request.post('/auth/register').send(subscription);
      newSubscription = response.body;
    });

    afterEach(async () => {
      await request.delete(`/user/${newSubscription._id}`);
    });

    it('should update a user', async () => {
      let editedUser = { ...subscription, firstname: 'Jorj', lastname: 'Washington', role: 'USER' };
      let user = await userRepository.editUser(newSubscription._id, editedUser);
      user = JSON.parse(JSON.stringify(user));
      expect(user.firstname).toBe(editedUser.firstname);
      expect(user.lastname).toBe(editedUser.lastname);
      expect(user.role).toBe(editedUser.role);
    });

    it('should get all the subscriptions', async () => {
      let subscriptions = await userRepository.getUserAll();
      subscriptions = JSON.parse(JSON.stringify(subscriptions));
      expect(subscriptions).toBeInstanceOf(Array);
      expect(subscriptions).toContainEqual(newSubscription);
    });

    it('should get the subscriptions by id', async () => {
      let user = await userRepository.getUserByID(newSubscription._id);
      user = JSON.parse(JSON.stringify(user));
      expect(user).toEqual(newSubscription);
    });

    it('should delete the user by id', async () => {
      await userRepository.removeUser(newSubscription._id);
      let subscriptions = await userRepository.getUserAll();
      subscriptions = JSON.parse(JSON.stringify(subscriptions));
      expect(subscriptions).not.toContainEqual(newSubscription);
    });
  });
});
