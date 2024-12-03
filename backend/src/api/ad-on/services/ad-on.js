'use strict';

/**
 * ad-on service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ad-on.ad-on');
