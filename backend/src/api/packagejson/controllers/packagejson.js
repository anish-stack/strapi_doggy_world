'use strict';

/**
 * packagejson controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::packagejson.packagejson');
