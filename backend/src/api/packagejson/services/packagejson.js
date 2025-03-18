'use strict';

/**
 * packagejson service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::packagejson.packagejson');
