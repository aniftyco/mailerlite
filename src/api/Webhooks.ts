import { MailerLite } from '../MailerLite';

export class Webhooks {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
