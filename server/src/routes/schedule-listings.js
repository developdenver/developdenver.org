const express = require('express');
const passport = require('passport');
const router = express.Router();

const { read, list } = require('../controllers/schedule-listing');

export default app => {
    router.get('/', list);
    router.get('/:id', read);

    return router;
};
