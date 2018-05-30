'use strict';

const Controller           = require('./controller');
const MovieFilterValidator = require('../../../validators/movie-filter');
const MovieValidator       = require('../../../validators/movie');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator
      }
    }
  }]);

  server.route([{
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.list(request.query));
      },
      validate: {
        query: MovieFilterValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
