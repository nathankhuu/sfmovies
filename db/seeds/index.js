'use strict';

const Locations       = require('./data/locations')
const LocationsMovies = require('./data/locations-movies')
const Movies          = require('./data/movies');

exports.seed = (Knex) => {
  return Knex('movies').insert(Movies)
  .then(() => {
    return Knex('locations').insert(Locations);
  })
  .then(() => {
    return Knex('locations_movies').insert(LocationsMovies);
  });
};
