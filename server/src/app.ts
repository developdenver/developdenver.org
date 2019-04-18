require('dotenv').load();
import express from 'express';
import middleware from './middleware';
import authMiddleware from './auth/auth-middleware';
import router from './router';
import errorHandling from './error-handling';

const app = [middleware, authMiddleware, router, errorHandling].reduce(
    (app, component) => component(app),
    express(),
);
module.exports = app;
