const axios = require('axios');

module.exports = function addToMailgun({ profile, tags }) {
    if (process.env.NODE_ENV === 'test') return;
    return axios({
        method: 'post',
        url: 'https://us4.api.mailchimp.com/3.0/lists/600b94a821/members',
        auth: {
            username: 'anystring',
            password: process.env.MAILGUN_KEY,
        },
        data: {
            email_address: profile.email,
            status: 'subscribed',
            tags,
            merge_fields: {
                FNAME: profile.first_name,
                LNAME: profile.last_name,
            },
        },
    });
};
