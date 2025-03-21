// src/api/auth/routes/auth.js

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/make_a_grooming_Booking',
            handler: 'grooming-booking.makeAGroomingBooking',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/rate_Service',
            handler: 'grooming-booking.rate_Service',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/cancel_booking_grooming',
            handler: 'grooming-booking.cancel_booking',
            config: {
                policies: [],
                middlewares: [],
            },
        }

    ],
};
