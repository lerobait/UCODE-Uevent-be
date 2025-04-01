import { z } from 'zod';
import { ConfigValidator } from '../config.validator';

const MailSchema = z.object({
  MAIL_PORT: z.coerce.number().default(465),
  MAIL_HOST: z.string(),
  MAIL_AUTH_USER: z.string(),
  MAIL_AUTH_PASS: z.string(),
  MAIL_FROM_NAME: z.string(),
  MAIL_FROM_ADDRESS: z.string(),
});

export type IMailConfig = ReturnType<typeof getMailConfig>;
const getMailConfig = () => {
  const config = ConfigValidator.validate(process.env, MailSchema);

  return {
    mail: {
      port: config.MAIL_PORT,
      host: config.MAIL_HOST,
      auth: {
        user: config.MAIL_AUTH_USER,
        pass: config.MAIL_AUTH_PASS,
      },
      from: {
        name: config.MAIL_FROM_NAME,
        address: config.MAIL_FROM_ADDRESS,
      },
      secure: config.MAIL_PORT === 465,
    },
  };
};

export default getMailConfig;
