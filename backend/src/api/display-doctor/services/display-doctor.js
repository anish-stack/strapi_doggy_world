'use strict';

/**
 * display-doctor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::display-doctor.display-doctor');
