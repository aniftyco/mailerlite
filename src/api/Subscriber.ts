import { MailerLite } from '../MailerLite';
import { FullSubscriber } from './Subscribers';

export type SubscriberTypes =
  | 'active'
  | 'unsubscribed'
  | 'bounced'
  | 'junk'
  | 'unconfirmed';

export type ActivityType =
  | 'opens'
  | 'clicks'
  | 'junks'
  | 'bounces'
  | 'unsubscribes'
  | 'forwards'
  | 'sendings';

export class Subscriber<Subscriber = FullSubscriber> {
  readonly id: number;

  constructor(subscriber: Subscriber, private client: MailerLite) {
    Object.entries(subscriber).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  public async groups() {
    return this.client.get(`/subscribers/${this.id}/groups`);
  }

  public async activity(type?: ActivityType) {
    return this.client.get(`/subscribers/${this.id}/activity/${type}`);
  }
}
