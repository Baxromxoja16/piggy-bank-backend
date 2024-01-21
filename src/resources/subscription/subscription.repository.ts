import Subscription, { ISubsription } from './subscription.model';

class SubscriptionRepository {
  async getSubsAll(id: string) {
    const users = await Subscription.find({ account_id: id });
    return users;
  }

  async createSubs(subscription: Partial<ISubsription>) {
    const newSubscription = await Subscription.create(subscription);
    return newSubscription;
  }

  async getSubsByID(id: string) {
    const subscription = await Subscription.findById(id);
    return subscription;
  }

  async editSubs(id: string, body: Partial<ISubsription>) {
    const subscription = await Subscription.findByIdAndUpdate(id, body, { new: true });
    return subscription;
  }

  async removeSubs(id: string) {
    await Subscription.findByIdAndDelete(id);
  }
}

export default new SubscriptionRepository();
