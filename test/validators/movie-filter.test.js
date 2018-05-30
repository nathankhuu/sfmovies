'use strict';

const Joi = require('joi');

const MovieFilterValidator = require('../../lib/validators/movie-filter.js');

describe('movie filter validator', () => {

  describe('start_year', () => {

    it('is after 1878', () => {
      const query = {
        start_year: 1800
      };
      const result = Joi.validate(query, MovieFilterValidator);
      
      expect(result.error.details[0].path[0]).to.eql('start_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const query = {
        start_year: 12345
      };
      const result = Joi.validate(query, MovieFilterValidator);

      expect(result.error.details[0].path[0]).to.eql('start_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('end_year', () => {

    it('is after 1878', () => {
      const query = {
        end_year: 1800
      };
      const result = Joi.validate(query, MovieFilterValidator);

      expect(result.error.details[0].path[0]).to.eql('end_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const query = {
        end_year: 12345
      };
      const result = Joi.validate(query, MovieFilterValidator);

      expect(result.error.details[0].path[0]).to.eql('end_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
