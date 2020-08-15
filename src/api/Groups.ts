import { MailerLite } from '../MailerLite';

export class Groups {
  private client: MailerLite;

  constructor(client: MailerLite) {
    this.client = client;
  }
}
