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
### ./client/.env.local
```
VUE_APP_API_URL=<your-api-url-here>
VUE_APP_API_BASE_URL=<your-api-base-url-here>
VUE_APP_IMAGE_UPLOAD_ENDPOINT=<your-image-upload-endpoint-here>
VUE_APP_PASSWORD_SALT=<your-pw-salt-here>
VUE_APP_LOGIN_PATH=<your-login-path-here>
```

### Server ENV
### ./server/.env
```
DEVELOPMENT_DATABASE_NAME=<your-db-name-here>
TEST_DATABASE_NAME=<your-test-db-name-here>
S3_BUCKET_REGION=<your-bucket-region-here>
S3_SECRET_ACCESS_KEY=<your-s3-secret-access-key-here>
S3_ACCESS_KEY_ID=<your-s3-access-key-id-here>
S3_BUCKET_NAME=<your-s3-bucket-name-here>
```
