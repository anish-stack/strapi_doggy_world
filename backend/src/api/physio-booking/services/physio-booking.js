'use strict';


const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::physio-booking.physio-booking', ({ strapi }) => ({
    async customMethod() {

        const result = await strapi.db.query('api::physio-booking.physio-booking').findMany();

        return result;
    },
}));


