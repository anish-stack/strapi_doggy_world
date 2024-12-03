'use strict';

/**
 * vaccination controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vaccination.vaccination');
