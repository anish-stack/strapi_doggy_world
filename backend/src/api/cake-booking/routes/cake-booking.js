
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
        },
        {
            method: 'POST',
            path: '/cancel_cake_order',
            handler: 'cake-booking.cancel_cake_order_by_user',
            config: {
                policies: [],
                middlewares: [],
            },
        }

    ],
};
