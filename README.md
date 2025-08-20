# PayNest

PayNest is a subscription management API built with **Node.js, Express, TypeScript, and MongoDB**.  
It provides authentication, user management, subscription tracking, and automated renewal reminders.

---

## 🚀 Features

- User authentication (sign up, sign in, sign out) with JWT
- Secure route authorization
- Subscription management (create, update, cancel, delete)
- Retrieve user subscriptions and upcoming renewals
- Automated email reminders for upcoming renewals (via workflows)
- Built with TypeScript and MongoDB (Mongoose)

---

## 📡 API Routes

### 🔐 Authentication
- `POST /auth/sign-up` → Register new user  
- `POST /auth/sign-in` → Authenticate user  
- `POST /auth/sign-out` → Logout user  

### 👤 User Management
- `GET /users/` → Get all users  
- `GET /users/:id` → Get user by ID (requires auth)  
- `PATCH /users/:id` → Update user (requires auth)  
- `DELETE /users/:id` → Delete user (requires auth)  

### 📦 Subscription Management
- `GET /subscriptions/:id` → Get subscription by ID (requires auth)  
- `GET /subscriptions/user/:userId` → Get subscriptions of a user (requires auth)  
- `GET /subscriptions/upcoming-renewals` → Get upcoming renewals (requires auth)  
- `POST /subscriptions/` → Create new subscription (requires auth)  
- `PUT /subscriptions/:id` → Update subscription (requires auth)  
- `PUT /subscriptions/:id/cancel` → Cancel subscription (requires auth)  
- `DELETE /subscriptions/:id` → Delete subscription (requires auth)  

### 🔄 Workflows
- `POST /workflows/subscription/reminder` → Trigger subscription reminders  

---

## ⚙️ Environment Variables

Create a `.env.development.local` file in the root of your project with the following:

```env
PORT=
SERVER_URL=

NODE_ENV=

DATABASE_URL=

JWT_SECRET=
JWT_EXPIRATION=

ARCJET_KEY=
ARCJET_ENV=

QSTASH_URL=
QSTASH_TOKEN=

EMAIL_PASSWORD=
EMAIL_USER=

APP_URL=
```

---

## 🛠️ Installation & Running

### Clone repository
```bash
git clone https://github.com/AlexandreDresch/PayNest.git
cd PayNest
```

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run dev
```

### Build project
```bash
npm run build
```

### Run in production
```bash
npm start
```

### Lint code
```bash
npm run lint
```

---

## 📦 Dependencies

- **express** – Web framework  
- **mongoose** – MongoDB ODM  
- **jsonwebtoken** – Authentication (JWT)  
- **bcryptjs** – Password hashing  
- **nodemailer** – Email service  
- **dayjs** – Date handling  
- **@upstash/workflow** – Workflow orchestration  
- **@arcjet/node** – Security middleware  

---

## 📜 License

MIT License © 2025 PayNest
