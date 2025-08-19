import dayjs from 'dayjs';

import { emailTemplates } from './email-template.js';

import config from '../config/config.js';

import { transporter } from '../config/nodemailer.js';

import type { SubscriptionDoc } from '../types/index.js';

interface SendReminderParams {
  to: string;
  type: string;
  subscription: SubscriptionDoc;
}

export const sendReminderEmail = async ({
  to,
  type,
  subscription,
}: SendReminderParams): Promise<void> => {
  if (!to || !type) {
    throw new Error('Missing required parameters.');
  }

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) {
    throw new Error(`Invalid email type: ${type}`);
  }

  const mailInfo = {
    userName: subscription.user?.username ?? 'User',
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format('MMMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price.toFixed(2)} (${subscription.interval})`,
    paymentMethod: subscription.paymentMethod ?? 'N/A',
    accountSettingsLink: `${config.appUrl}/account/settings`,
    supportLink: `${config.appUrl}/support`,
    daysLeft: dayjs(subscription.renewalDate).diff(dayjs(), 'day'),
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: `"PayNest" <${config.emailUser}>`,
    to,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions).then(
    (info) => {
      console.log('Email sent:', info.response);
    },
    (error) => {
      console.error('Error sending email:', error);
    },
  );
};
