import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    email: string;
  };
}

export interface SubscriptionParams {
  id: string;
}

export interface WorkflowContext {
  requestPayload: {
    subscriptionId: string;
    user: {
      email: string;
      username?: string;
    };
  };
  run: (label: string, fn: () => Promise<void>) => Promise<void>;
  sleepUntil: (label: string, date: Date) => Promise<void>;
}

export interface EmailTemplateData {
  userName: string;
  subscriptionName: string;
  renewalDate: string;
  planName: string;
  price: string;
  paymentMethod: string;
  accountSettingsLink: string;
  supportLink: string;
  daysLeft: number;
}

export interface EmailTemplate {
  label: string;
  generateSubject: (data: EmailTemplateData) => string;
  generateBody: (data: EmailTemplateData) => string;
}

import { Document, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
}

export interface SubscriptionAttrs {
  name: string;
  price: number;
  currency:
    | 'USD'
    | 'EUR'
    | 'GBP'
    | 'INR'
    | 'AUD'
    | 'CAD'
    | 'JPY'
    | 'BRL'
    | 'CNY'
    | 'RUB';
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category:
    | 'sports'
    | 'entertainment'
    | 'education'
    | 'health'
    | 'technology'
    | 'lifestyle'
    | 'business'
    | 'news'
    | 'gaming'
    | 'music'
    | 'food'
    | 'travel'
    | 'fashion'
    | 'finance'
    | 'art'
    | 'photography'
    | 'books'
    | 'movies'
    | 'podcasts'
    | 'tv-shows'
    | 'software'
    | 'other';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';
  status: 'active' | 'inactive' | 'cancelled';
  startDate: Date;
  renewalDate: Date;
  userId: Types.ObjectId;
}

export interface SubscriptionDoc extends Document, SubscriptionAttrs {
  user?: User;
}
