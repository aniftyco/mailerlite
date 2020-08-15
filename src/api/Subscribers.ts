import { MailerLite } from '../MailerLite';

type SubscriberTypes =
  | 'active'
  | 'unsubscribed'
  | 'bounced'
  | 'junk'
  | 'unconfirmed';

type QueryParams = {
  limit?: number;
  offset?: number;
};

type AllQueryParams = QueryParams & {
  type?: SubscriberTypes;
};

type Subscriber = {
  id: number;
  email: string;
  name: string;
  sent: number;
  opened: number;
  clicked: number;
  type: SubscriberTypes;
  signupIp: string;
  signupTimestamp: string;
  confirmationTimestamp: string;
  fields: Record<string, any>;
  dateSubscribed: string;
  dateUnsubscribed: string;
  dateCreated: string;
  dateUpdated: string;
};

type CreateData = {
  email: string;
  name?: string;
  fields?: Record<string, any>;
  resubscribe?: boolean;
  type?: 'unsubscribed' | 'active' | 'unconfirmed';
  signupIp?: string;
  signupTimestamp?: string;
  confirmationIp?: string;
  confirmationTimestamp?: string;
};

type SearchQueryParams = QueryParams & {
  query: string;
};

export class Subscribers {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }

  public async all(params?: AllQueryParams) {
    return this.client.get<Subscriber[]>('/subscribers', params);
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

  public async create(data: CreateData) {
    return this.client.post<Subscriber>('/subscribers', data);
  }

  public async get(identifier: string) {
    return this.client.get<Subscriber>(`/subscribers/${identifier}`);
  }

  public async search(params: SearchQueryParams) {
    return this.client.get<Subscriber[]>('/subscribers/search', params);
  }
}
