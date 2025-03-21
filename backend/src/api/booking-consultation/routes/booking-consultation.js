// src/api/auth/routes/auth.js

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/create-consultation-bboking',
            handler: 'booking-consultation.createOrder',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/cancel-consultation-bboking',
            handler: 'booking-consultation.cancel_booking',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/rate-consultation-bboking',
            handler: 'booking-consultation.rate_Service',
            config: {
                policies: [],
                middlewares: [],
            },
        },

    ],
};
