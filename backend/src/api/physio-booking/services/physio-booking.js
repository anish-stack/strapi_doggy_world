'use strict';

/**
 * physio-booking service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::physio-booking.physio-booking');
