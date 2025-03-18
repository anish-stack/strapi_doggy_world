
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pet-shop-and-bakery-order.pet-shop-and-bakery-order', ({ strapi }) => ({
    async customMethod() {

        const result = await strapi.db.query('api::pet-shop-and-bakery-order.pet-shop-and-bakery-order').findMany();
        console.log(result)
        return result;
    },
}));


