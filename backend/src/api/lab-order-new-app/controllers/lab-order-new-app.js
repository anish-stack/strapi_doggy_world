// 'use strict';



// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::lab-order-new-app.lab-order-new-app');

module.exports = {

    async create_order(ctx) {
        const { body } = ctx.request;
        console.log(body)
        return body

    }

};