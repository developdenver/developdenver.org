module.exports = {
    list: [
        {
            id: 1,
            first_name: 'First',
            last_name: 'Last',
            email: 'email@address.com',
            hashed_password:
                '$2b$12$cslZhjWLwYszSTK94gq6AOb3ntU8a9JYR61EtAABtP4RnnxgAihNW', // 'pw1'
            secret_key:
                '7176e688d7fe75324530f990fa598e5bc8bd442533cf74d644b3665a0d8346ed0f052f55adff4fa1a8f314a1543bdf88',
            linkedin_username: 'linkedin',
            github_username: 'github',
            twitter_username: 'twitter',
            website: 'https://website.com',
            is_self_employed: false,
            employer: 'Employer',
            position: 'Position',
            bio: 'Bio',
            profile_photo_url: 'http://via.placeholder.com/500x500',
            role: null,
        },
        {
            id: 2,
            first_name: 'First2',
            last_name: 'Last2',
            email: 'email2@address.com',
            hashed_password:
                '$2b$12$FFA87yNC1qZCYYKR5bJwDu/m0O2w6tf8w48sS2tU/V1NKDIRkCU/S', // 'pw2'
            secret_key:
                '03e7edfb322cd568900b667b2dc681561ea7e94cbd7e8076305d42e5a373757cd015d0bcc4432ac84df6a7d174efa8f3',
            linkedin_username: 'linkedin2',
            github_username: 'github2',
            twitter_username: 'twitter2',
            website: 'https://website2.com',
            is_self_employed: true,
            employer: 'Employer2',
            position: 'Position2',
            bio: 'Bio2',
            profile_photo_url: 'http://via.placeholder.com/500x500',
            role: null,
        },
    ],
    new: {
        first_name: 'First3',
        last_name: 'Last3',
        email: 'email3@address.com',
        password: 'pw3',
        linkedin_username: 'linkedin3',
        github_username: 'github3',
        twitter_username: 'twitter3',
        website: 'https://website3.com',
        is_self_employed: true,
        employer: 'Employer3',
        position: 'Position3',
        bio: 'Bio3',
        profile_photo_url: 'http://via.placeholder.com/500x500',
        role: 'attendee',
    },
};
