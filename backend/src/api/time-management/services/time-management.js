'use strict';

/**
 * time-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::time-management.time-management');
