import { MailerLite } from '../MailerLite';

export class Campaigns {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
