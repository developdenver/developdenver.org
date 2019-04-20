const Sentry = require('@sentry/node');

export class ClientError extends Error {
    get status() {
        return 400;
    }
}

export function withErrorHandling<T>(res, action: () => Promise<T | null>) {
    const result = action();
    return result.catch(err => {
        if (err instanceof ClientError) {
            res.status(err.status).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
            if (
                process.env.NODE_ENV === 'development' ||
                process.env.NODE_ENV === 'test'
            ) {
                console.error(err);
            }
        }
        return null;
    });
}

export default function(app) {
    app.use(function(request, response, next) {
        const error = new Error('Not Found');
        // @ts-ignore
        error.status = 404;
        next(error);
    });

    app.use(Sentry.Handlers.errorHandler());

    app.use(function(error, request, response, next) {
        console.error(error);
        response.locals.message = error.message;
        response.locals.error =
            request.app.get('env') === 'development' ? error : {};

        if (error.message === 'Incorrect password') {
            error.status = 401;
        }
        response.status(error.status || 500).send({ error: error.message });
    });

    return app;
}
