import scheduleListings from './routes/schedule-listings';
import profiles from './routes/profiles';
import auth from './routes/auth';
import payments from './routes/payments';
import talks from './routes/talks';
import votes from './routes/votes';
import events from './routes/events';
import tickets from './routes/tickets';

export default app => {
    app.use('/schedule-listings', scheduleListings(app));
    app.use('/profiles', profiles(app));
    app.use('/auth', auth(app));
    app.use('/payments', payments(app));
    app.use('/talks', talks(app));
    app.use('/votes', votes(app));
    app.use('/events', events(app));
    app.use('/tickets', tickets(app));
    return app;
};
