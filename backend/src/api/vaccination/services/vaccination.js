'use strict';

/**
 * vaccination service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vaccination.vaccination');
