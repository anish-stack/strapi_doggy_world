'use strict';

/**
 * grooming-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grooming-service.grooming-service');
