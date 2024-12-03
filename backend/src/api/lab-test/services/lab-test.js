'use strict';

/**
 * lab-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lab-test.lab-test');
