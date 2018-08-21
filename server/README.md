## Develop Denver API

### Setup

1. Fork & Clone, `npm install`
2. Create development and test PostgreSQL databases
3. Copy `.env.example` to `.env` and enter the names of your databases
4. Run `npm run dev:database:setup` and `npm run test:database:setup`
5. `npm test`

### Routes

`/profiles`

* `GET /` - List profiles
* `POST /email` - Tests for email uniqueness
* `GET /:id` - Read a profile
* `PUT /` - Update a profile
* `POST /` - Create a profile
* `DELETE /:id` - Delete a profile

`/payments`

* `POST /` - Charge a payment

`/auth`

* `POST /login` - Get a token and a profile
* `POST /reset-request` - Send an email with a link to reset password
* `POST /reset-password` - Reset a password
