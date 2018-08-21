# develop-denver

> Develop Denver

## Getting Started

### Client

- CD into client directory
- `npm install`
- `npm run serve`

### Server
- CD into server directory
- `npm install`
- Create development and test PostgreSQL databases
- Copy `.env.example` to `.env` and enter the names of your databases
- Run `npm run dev:database:setup` and `npm run test:database:setup`
- `npm test`
- `npm start`

## Troubleshooting 
- Check your version of Node
- Install 10 + if it is below that. 

## ENV examples
### Client ENV
### ./client/.env.example
```
VUE_APP_API_URL=<your-api-url-here>
VUE_APP_IMAGE_UPLOAD_ENDPOINT=<your-image-upload-endpoint-here>
VUE_APP_UNIQUE_EMAIL_ENDPOINT=profiles/email
VUE_APP_LOGIN_PATH=<your-login-path-here>
VUE_APP_STRIPE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
VUE_APP_PAYMENTS_URL=http://localhost:3000/payments
VUE_APP_RESET_PASSWORD_PATH=auth/reset-password
VUE_APP_RESET_REQUEST_PATH=auth/reset-request
```

### Server ENV
### ./server/.env
```
DEVELOPMENT_DATABASE_NAME=<your-db-name-here>
TEST_DATABASE_NAME=<your-test-db-name-here>
STAGING_DATABASE_URL=postgres://xxxxxxx:yyyyyyy@zzzzz.amazonaws.com:5432/aaaaaaa
PRODUCTION_DATABASE_URL=postgres://xxxxxxx:yyyyyyy@zzzzz.amazonaws.com:5432/aaaaaaa
STRIPE_KEY=sk_test_xxxxxxxxxxxxxxxxxx
FROM_EMAIL_ADDRESS=username@domain.org
EMAIL_PASSWORD=email_password
PASSWORD_RESET_CALLBACK=http://localhost:8080/reset-password
```
