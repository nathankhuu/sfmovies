'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  start_year: Joi.number().integer().min(1878).max(9999).optional(),
  end_year: Joi.number().integer().min(1878).max(9999).optional()
});
