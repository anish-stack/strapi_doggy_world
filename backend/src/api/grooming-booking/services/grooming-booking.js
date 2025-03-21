
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grooming-booking.grooming-booking', ({ strapi }) => ({
  async customMethod() {

    const result = await strapi.db.query('api::grooming-booking.grooming-booking').findMany();
    console.log(result)
    return result;
  },
}));

