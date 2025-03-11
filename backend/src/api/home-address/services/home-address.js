'use strict';

/**
 * home-address service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-address.home-address');
