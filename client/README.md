## Environment Variables

```
VUE_APP_API_URL=http://localhost:3000
VUE_APP_IMAGE_UPLOAD_URL=http://localhost:3001/images
VUE_APP_UNIQUE_EMAIL_ENDPOINT=profiles/email
VUE_APP_LOGIN_PATH=auth/login
VUE_APP_STRIPE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
VUE_APP_PAYMENTS_URL=http://localhost:3000/payments
VUE_APP_RESET_PASSWORD_PATH=auth/reset-password
VUE_APP_RESET_REQUEST_PATH=auth/reset-request
```

## Scripts

* `npm run serve` - Run a development server
* `npm run build:staging` - Build a production app with the staging environment variables
* `npm run build:production` - Build a production app with the production environment variables
* `npm run lint` - Lint and auto-correct errors
* `test:unit` - Run the tests in the `tests/unit` folder once
* `test:unit:watch` - Run the tests in the `tests/unit` folder continuously
* `test:e2e` - Run the end-to-end tests headlessly with electron
