
module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/create_cake_order',
            handler: 'cake-booking.create_cake_order',
            config: {
                policies: [],
                middlewares: [],
            },
        }

    ],
};
