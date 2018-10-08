-- Workshops
DELETE FROM talk WHERE id IN (100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119);

INSERT INTO talk (id, title, type, talk_photo_url, user_id, description)
VALUES (
    100, 'Suck Less At Interviewing', 'workshop', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 8,
'
Interviewing is hard, but there’s good news: most interviewers use a predictable set of questions, and we know the best way to answer them. Join us to learn the secret!

In this workshop, we will practice and refine your answers for the following interview questions:

* Tell me about yourself
* Tell me about a time you handled a challenge at work

Come prepared to quickly improve your answers and walk out of the room ready for your next interview.
'
),(
    101, 'Suck Less At Networking', 'workshop', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 8,
'
Networking is important for people in the tech industry to keep up with new trends, establish connections to find your next job, and to make friends. Networking events can be stressful, though, if you don’t have a plan.

During this workshop, we’ll help you craft a plan for your next networking event, including how to work the room by initiating conversations with new people, and how to talk about yourself and your journey in tech.
'
),(
    102, 'Testing Web Applications', 'workshop', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 194,
'
Testing web applications doesn\'t have to be painful. Join us for this workshop to get some hands-on experience with Cypress, an end-to-end framework that tests any app that has a user interface.

* By the end of this workshop, participants will be able to:
* Install and configure Cypress tests from scratch
* Write at least 3 Cypress assertions
* Stretch: Test user input with Cypress actions
'
),(
    103, 'Getting Started With DevOps', 'workshop', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 246,

'
Continuous Integration and Continuous Deployment is essential for companies that want their developers to be able to deploy code quickly, efficiently, and with minimal application downtime.

In this workshop, you will get a taste of what it takes to setup a CI/CD pipeline using CircleCI and Heroku. For the workshop, we will provide you with a working application with a functional test suite.

By the end of this workshop, participants will be able to:

* Manually run the application test suite
* Manually deploy the application to Heroku
* Configure CircleCI to run your test suite
* Configure CircleCI to deploy your app to Heroku if all tests are passing.
'
),(
    104, 'Workshop Assistance', 'workshop', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Get assistance with any of the workshop material, or start a workshop that you weren\'t able to attend.
'
),(
    105, 'Birds of a Feather', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Impromptu talks, requested and given by Develop Denver attendees!
'
),(
    106, 'Opening Ceremonies', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Conference overview and opening keynote
'
),(
    107, 'Opening Night Happy Hour', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
RINO Yacht Club
'
),(
    108, 'Closing Ceremonies', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Ballmer Peak presentations and closing words
'
),(
    109, 'Closing Party', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Closing party and taco bar
'
),(
    110, 'Coding Garden with CJ', 'performance', 'https://i.ytimg.com/vi/moLu596PvHU/hqdefault.jpg', 181,
'
Live-stream with CJ!
'
),(
    111, 'House of Pod: Podcasting 101', 'performance', 'https://media.licdn.com/media-proxy/ext?w=800&h=800&hash=QrGBt5k%2B16Fe3CyBly2ZhhBgp%2Fw%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6nlh8Tw1It6a2FowGz60oISIfYC2G8G2f1spyfNT-tdoDSeLehpEtOdSsGlxJkcrG-GGGiSp7oYfuULKE18teBWemkMjNDOz4xlWRc78siLkp9jNH1Ia3_ci8Tg6kKTi6bEZrdX1Y0OCgn2sDbIZHpHHsz6WfJH_v5OPpRX-JlvdFolUteleTpDdI13NVGwUtWwFew7bLIGgsc7ayJI2PzJWESWnXpHNlApISX-AiBv3zZvQSHv966L6T6FvQ_zmaC9q6LXiDO2k1RpzE7jTFKr9p-GCDbnYMc5RG7Nvondhu4mvk', 2,
'
Learn how to make a podcast!
'
),(
    112, 'Sprint UX Podcast', 'performance', 'https://static1.squarespace.com/static/584dd01dbebafb9fcae5e2f2/t/584f27cc6b8f5b32b20ebc1e/1481582549510/?format=500w', 2,
'
Kyle, Michael, and Emily talk about the latest UX, design, and tech news.
'
),(
    113, 'The Ballmer Peak Hackathon', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
DRNK // DVLP
'
),(
    114, 'Lightning Talks #1', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Featuring:

* [Better Living Through Git Hooks](https://developdenver.org/talks/49)
* [Introverts and Extroverts: How You Can Help Your Teammates Shine](https://developdenver.org/talks/65)
* [Let\'s Help Our Colleagues Who Have Depression!](https://developdenver.org/talks/10)
* [APIs are Awful & Integration is Awesome](https://developdenver.org/talks/21)
'
),(
    115, 'Lightning Talks #2', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Featuring:

* [How to Prevent Your Domain from being used for Spam Emails or How I learned to stop worrying and love DMARC](https://developdenver.org/talks/89)
* [How we think about security in the virtual space](https://developdenver.org/talks/41)
* [DIY Livestreaming: Setting up your Events for a Wider Audience](https://developdenver.org/talks/75)
* [Awk is for lovers (of text)](https://developdenver.org/talks/35)
'
),(
    116, 'Lightning Talks #3', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Featuring:

* [Mobile Sensor Data Through the Browser! Who Needs Native?](https://developdenver.org/talks/51)
* [Growth mindset](https://developdenver.org/talks/82)
* [Git Stash Explained: Switch Context without Losing Your Place](https://developdenver.org/talks/36)
* [Recording Architectural Decisions](https://developdenver.org/talks/12)
* [One step at a time - Journey back to the world of tech!](https://developdenver.org/talks/60)
'
),(
    117, 'Check-in', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Pick up your badge, enjoy coffee and breakfast on us, and check out our merchandise!
'
),(
    118, 'Career Corner & Workshop Support', 'event', 'https://s3-us-west-2.amazonaws.com/develop-denver-user-images/dvlp_workshops.png', 2,
'
Career Corner:

* Resume review
* Mock interview questions
* Career advice

Workshop Support:

If you missed any of the workshop content from Thursday or would like help working through the exercises, we\'ll have instructors on hand to help!
'
);

ALTER SEQUENCE venue_id_seq RESTART WITH 120;

-- Venue
DELETE FROM venue;

INSERT INTO venue (id, name, location, coordinates)
VALUES (
    1, 'Bigsby\'s Folly', '3563 Wazee St, Denver, CO 80216', '39.769010, -104.977180'
),(
    2, 'Catalyst', '3513 Brighton Blvd, Denver, CO 80216', '39.767480, -104.982560'
),(
    3, 'Source Hotel', '3350 Brighton Blvd, Denver, CO 80216', '39.768730, -104.979750'
),(
    4, 'Urban Cyclist', '3434 Brighton Blvd, Denver, CO 80216', '39.769570, -104.979300'
),(
    5, 'Big Trouble', '3501 Wazee St Suite #100, Denver, CO 80216', '39.769550, -104.976860'
),(
    6, 'RINO Yacht Club', '3350 Brighton Blvd #100, Denver, CO 80216', '39.768730, -104.979750'
);

ALTER SEQUENCE venue_id_seq RESTART WITH 7;

-- Schedule
DELETE FROM schedule_listing;

INSERT INTO schedule_listing (id, day, start_time, duration, venue_id, talk_id)
VALUES (
    1, 'Thursday', 8, 1, 1, 117
), (
    2, 'Thursday', 12, 1, 1, 114
), (
    3, 'Thursday', 13, 1, 1, 115
), (
    4, 'Thursday', 14, 1, 1, 116
), (
    5, 'Thursday', 9, 1, 2, 106
), (
    6, 'Thursday', 10, 1, 2, 48
), (
    7, 'Thursday', 11, 1, 2, 67
), (
    8, 'Thursday', 12, 1, 2, 9
), (
    9, 'Thursday', 14, 1, 2, 20
), (
    10, 'Thursday', 15, 1, 2, 45
), (
    11, 'Thursday', 16, 1, 2, 31
), (
    12, 'Thursday', 10, 1, 5, 81
), (
    13, 'Thursday', 11, 1, 5, 64
), (
    14, 'Thursday', 14, 1, 5, 40
), (
    15, 'Thursday', 15, 1, 5, 56
), (
    16, 'Thursday', 10, 1, 4, 102
), (
    17, 'Thursday', 11, 1, 4, 103
), (
    18, 'Thursday', 12, 1, 4, 104
), (
    19, 'Thursday', 13, 1, 4, 100
), (
    20, 'Thursday', 14, 1, 4, 101
), (
    21, 'Thursday', 15, 1.25, 4, 33
), (
    22, 'Thursday', 16.25, 1.25, 4, 105
), (
    23, 'Thursday', 10, 1, 3, 66
), (
    24, 'Thursday', 11, 1, 3, 1
), (
    25, 'Thursday', 13, 1, 3, 57
), (
    26, 'Thursday', 14, 1, 3, 7
), (
    27, 'Thursday', 15, 1, 3, 8
), (
    28, 'Thursday', 16, 1, 3, 68
), (
    29, 'Thursday', 17, 4, 6, 107
), (
    30, 'Friday', 8, 1, 1, 117
), (
    31, 'Friday', 9, 4.5, 1, 118
), (
    32, 'Friday', 9, 1, 2, 28
), (
    33, 'Friday', 10, 1, 2, 71
), (
    34, 'Friday', 12, 1, 2, 46
), (
    35, 'Friday', 13, 1, 2, 25
), (
    36, 'Friday', 14, 1, 2, 15
), (
    37, 'Friday', 15, 1, 2, 13
), (
    38, 'Friday', 16, 1, 2, 26
), (
    39, 'Friday', 17, 1, 2, 108
), (
    40, 'Friday', 18, 4, 2, 109
), (
    41, 'Friday', 9, 1, 5, 52
), (
    42, 'Friday', 10, 1, 5, 6
), (
    43, 'Friday', 11, 1, 5, 27
), (
    44, 'Friday', 13, 1, 5, 38
), (
    45, 'Friday', 14, 1, 5, 55
), (
    46, 'Friday', 15, 1, 5, 30
), (
    47, 'Friday', 9, 1, 4, 110
), (
    48, 'Friday', 10, 1, 4, 111
), (
    49, 'Friday', 11, 1, 4, 112
), (
    50, 'Friday', 13, 4, 4, 113
), (
    51, 'Friday', 9, 1, 3, 43
), (
    52, 'Friday', 10, 1, 3, 4
), (
    53, 'Friday', 12, 1, 3, 50
), (
    54, 'Friday', 13, 1, 3, 24
), (
    55, 'Friday', 14, 1, 3, 5
), (
    56, 'Friday', 15, 1, 3, 70
), (
    57, 'Friday', 16, 1, 3, 18
);

ALTER SEQUENCE schedule_listing_id_seq RESTART WITH 58;
