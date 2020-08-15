import { MailerLite } from '../MailerLite';

export class Settings {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
