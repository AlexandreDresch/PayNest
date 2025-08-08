import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required.'],
      trim: true,
      minLength: [2, 'Subscription name must be at least 2 characters long.'],
      maxLength: [100, 'Subscription name must not exceed 100 characters.'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive number.'],
    },

    currency: {
      type: String,
      enum: [
        'USD',
        'EUR',
        'GBP',
        'INR',
        'AUD',
        'CAD',
        'JPY',
        'BRL',
        'CNY',
        'RUB',
      ],
      default: 'USD',
      required: [true, 'Currency is required.'],
    },

    interval: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: [true, 'Subscription interval is required.'],
    },

    category: {
      type: String,
      enum: [
        'sports',
        'entertainment',
        'education',
        'health',
        'technology',
        'lifestyle',
        'business',
        'news',
        'gaming',
        'music',
        'food',
        'travel',
        'fashion',
        'finance',
        'art',
        'photography',
        'books',
        'movies',
        'podcasts',
        'tv-shows',
        'software',
        'other',
      ],
      required: [true, 'Subscription category is required.'],
    },

    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer', 'crypto'],
      required: [true, 'Payment method is required.'],
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active',
      required: [true, 'Subscription status is required.'],
    },

    startDate: {
      type: Date,
      required: [true, 'Start date is required.'],
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: 'Start date cannot be in the future.',
      },
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (this: mongoose.Document, value: Date) {
          const startDate = this.get('startDate');
          return value > startDate;
        },
        message: 'Renewal date must be after the start date.',
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.'],
      index: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.interval],
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = 'inactive';
  }

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
