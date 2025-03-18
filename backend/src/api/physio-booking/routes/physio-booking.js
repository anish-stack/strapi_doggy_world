
module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/make-order-physio-booking',
            handler: 'physio-booking.physio_booking',
            config: {
                policies: [],
                middlewares: [],
            },
        }
    ]
}