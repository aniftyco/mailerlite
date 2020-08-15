import { MailerLite } from '../MailerLite';

export class Stats {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
