'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cake-booking.cake-booking', ({ strapi }) => ({
    async customMethod() {

        const result = await strapi.db.query('api::cake-booking.cake-booking').findMany();
        console.log(result)
        return result;
    },
}));

