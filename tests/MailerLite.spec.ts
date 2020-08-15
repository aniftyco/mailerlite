import { MailerLite } from './../src/MailerLite';

describe('MailerLite', () => {
  it('should be return an instance of itself', () => {
    const mailerlite = new MailerLite('foobar');

    expect(mailerlite).toBeInstanceOf(MailerLite);
  });
});
