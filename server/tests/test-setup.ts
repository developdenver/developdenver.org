process.env.NODE_ENV = 'test';
// @ts-ignore
global.assert = require('assert');
// @ts-ignore
global.request = require('supertest');
// @ts-ignore
global.testDatabase = require('../src/database-connection');
// @ts-ignore
global.app = require('../src/app');
