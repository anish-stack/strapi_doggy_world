'use strict';

/**
 * pet-shop-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pet-shop-product.pet-shop-product');
