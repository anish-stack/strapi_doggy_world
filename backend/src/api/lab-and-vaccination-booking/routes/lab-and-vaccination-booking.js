
module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/make-order-lab-vacination',
        handler: 'lab-and-vaccination-booking.make_order',
        config: {
          policies: [],
          middlewares: [],
        },
      }
    ]
}