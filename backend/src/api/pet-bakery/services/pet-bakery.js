'use strict';

/**
 * pet-bakery service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pet-bakery.pet-bakery');
