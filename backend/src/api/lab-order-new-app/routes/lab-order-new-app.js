// 'use strict';

// /**
//  * lab-order-new-app router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::lab-order-new-app.lab-order-new-app');
module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/lab-order-new-app', 
        handler: 'lab-order-new-app.create_order',
        config: {
          policies: [],
          middlewares: [],
        },
      }
    ]
}