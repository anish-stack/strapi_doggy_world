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
        }

    ],
};
