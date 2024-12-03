'use strict';

/**
 * physiotherapy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::physiotherapy.physiotherapy');
