'use strict';

/**
 * petshop service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::petshop.petshop');
