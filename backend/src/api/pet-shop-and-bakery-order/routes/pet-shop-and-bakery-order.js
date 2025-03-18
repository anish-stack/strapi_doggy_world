module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/create_order_of_product',
            handler: 'pet-shop-and-bakery-order.create_order_of_product',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/cancel_my_order',
            handler: 'pet-shop-and-bakery-order.cancel_my_order',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/get_my_order',
            handler: 'pet-shop-and-bakery-order.get_my_order',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/rate_order_product',
            handler: 'pet-shop-and-bakery-order.rate_order_product',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
