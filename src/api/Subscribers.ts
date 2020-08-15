import { MailerLite } from '../MailerLite';
import { SubscriberTypes, Subscriber } from './Subscriber';

export type QueryParams = {
  limit?: number;
  offset?: number;
};

export type AllQueryParams = QueryParams & {
  type?: SubscriberTypes;
};

export type SubscriberFields<Fields> = Fields & {
  city?: string;
  company?: string;
};

export type CreateSubscriber<Fields> = {
  email: string;
  name?: string;
  fields?: SubscriberFields<Fields>;
  resubscribe?: boolean;
  type?: 'unsubscribed' | 'active' | 'unconfirmed';
  signupIp?: string;
  signupTimestamp?: string;
  confirmationIp?: string;
  confirmationTimestamp?: string;
};

export type SearchQueryParams = QueryParams & {
  minimized?: boolean;
};

export type MinimizedSubscriber = Subscriber & {
  readonly email: string;
  readonly type: SubscriberTypes;
};

export type FullSubscriber = Subscriber & {
  readonly email: string;
  readonly type: SubscriberTypes;
  readonly name: string;
  readonly sent: number;
  readonly opened: number;
  readonly clicked: number;
  readonly signupIp: string;
  readonly signupTimestamp: string;
  readonly confirmationTimestamp: string;
  readonly fields: Record<string, any>;
  readonly dateSubscribed: string;
  readonly dateUnsubscribed: string;
  readonly dateCreated: string;
  readonly dateUpdated: string;
};

export class Subscribers {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }

  public async all(params?: AllQueryParams) {
    const subscribers = await this.client.get('/subscribers', params);

    return subscribers.map(
      (subscriber: FullSubscriber) => new Subscriber(subscriber, this.client)
    ) as FullSubscriber[];
  }

  public async active(params?: QueryParams) {
    return this.all({ ...params, type: 'active' });
  }

  public async unsubscribed(params?: QueryParams) {
    return this.all({ ...params, type: 'unsubscribed' });
  }

  public async bounced(params?: QueryParams) {
    return this.all({ ...params, type: 'bounced' });
  }

  public async junk(params?: QueryParams) {
    return this.all({ ...params, type: 'junk' });
  }

  public async unconfirmed(params?: QueryParams) {
    return this.all({ ...params, type: 'unconfirmed' });
  }

  public async create<Fields = Record<string, any>>(
    data: CreateSubscriber<Fields>
  ) {
    const subscriber = await this.client.post('/subscribers', data);

    return new Subscriber(subscriber, this.client) as FullSubscriber;
  }

  public async get(identifier: string | number) {
    const subscriber = this.client.get(`/subscribers/${identifier}`);

    return new Subscriber(subscriber, this.client) as FullSubscriber;
  }

  public async search<
    Params extends SearchQueryParams,
    Subscriber = Params['minimized'] extends true
      ? MinimizedSubscriber
      : FullSubscriber
  >(query: string, params?: Params): Promise<Subscriber[]> {
    const subscribers = await this.client.get<Subscriber[]>(
      '/subscribers/search',
      {
        query,
        ...params,
      }
    );

    return subscribers.map((subscriber) => {
      return new Subscriber(subscriber, this.client) as any;
    });
  }
}
