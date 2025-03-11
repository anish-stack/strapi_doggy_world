'use strict';


const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lab-and-vaccination-booking.lab-and-vaccination-booking', ({ strapi }) => ({
  async customMethod() {

    const result = await strapi.db.query('api::lab-and-vaccination-booking.lab-and-vaccination-booking').findMany();
 
    return result;
  },
}));

