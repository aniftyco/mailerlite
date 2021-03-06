import { join } from 'path';
import { readFileSync } from 'fs';
import axios, { AxiosInstance } from 'axios';
import isObject from 'lodash.isobject';
import { toCamel, toSnake } from 'convert-keys';
import {
  Campaigns,
  Fields,
  Segments,
  Stats,
  Settings,
  Subscribers,
  Webhooks,
  Groups,
} from './api';

const { version: VERSION } = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);

export class MailerLite {
  private version = VERSION;
  private baseUrl = 'https://api.mailerlite.com/api/v2';
  private client: AxiosInstance = null;

  public campaigns: Campaigns;
  public fields: Fields;
  public groups: Groups;
  public segments: Segments;
  public stats: Stats;
  public settings: Settings;
  public subscribers: Subscribers;
  public webhooks: Webhooks;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': `MailerLite Node.js SDK/v${this.version} (https://git.io/mailerlite)`,
        'X-MailerLite-ApiKey': apiKey,
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((request) => {
      if (!!request.data && isObject(request.data)) {
        request.data = toSnake(request.data);
      }

      return request;
    });

    this.client.interceptors.response.use((response) => {
      return toCamel(response.data);
    });

    this.campaigns = new Campaigns(this);
    this.fields = new Fields(this);
    this.groups = new Groups(this);
    this.segments = new Segments(this);
    this.stats = new Stats(this);
    this.settings = new Settings(this);
    this.subscribers = new Subscribers(this);
    this.webhooks = new Webhooks(this);
  }

  public async get<R = any>(url: string, params?: Record<string, any>) {
    return this.client.get(url, { params }) as Promise<R>;
  }

  public async post<R = any>(url: string, data?: Record<string, any>) {
    return this.client.post(url, { data }) as Promise<R>;
  }

  public async put<R = any>(url: string, data?: Record<string, any>) {
    return this.client.put(url, { data }) as Promise<R>;
  }

  public async delete<R = any>(url: string) {
    return this.client.delete(url) as Promise<R>;
  }
}
