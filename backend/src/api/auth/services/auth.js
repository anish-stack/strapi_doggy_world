'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auth.auth', ({ strapi }) => ({
  async customMethod() {

    const result = await strapi.db.query('api::auth.auth').findMany();
 
    return result;
  },
}));
