
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::booking-consultation.booking-consultation', ({ strapi }) => ({
  async customMethod() {

    const result = await strapi.db.query('api::booking-consultation.booking-consultation').findMany();
    console.log(result)
    return result;
  },
}));

