'use strict';

/**
 * quantity service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quantity.quantity');
