import { MailerLite } from '../MailerLite';

export class Fields {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
