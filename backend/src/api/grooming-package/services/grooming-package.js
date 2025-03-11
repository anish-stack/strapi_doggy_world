'use strict';

/**
 * grooming-package service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grooming-package.grooming-package');
