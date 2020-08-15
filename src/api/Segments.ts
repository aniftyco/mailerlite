import { MailerLite } from '../MailerLite';

export class Segments {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
