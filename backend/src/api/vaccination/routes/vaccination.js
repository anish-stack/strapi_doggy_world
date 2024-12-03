'use strict';

/**
 * vaccination router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::vaccination.vaccination');
