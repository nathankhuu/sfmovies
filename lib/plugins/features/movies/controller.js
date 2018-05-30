'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const moviePayload = { name: payload.title, release_year: payload.release_year };
  return new Movie().save(moviePayload)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

exports.list = (query) => {
  const movieQuery = new Movie();
  if (query) {
    if (query.start_year) {
      movieQuery.where('release_year', '>=', query.start_year);
    }
    if (query.end_year) {
      movieQuery.where('release_year', '<=', query.end_year);
    }
  }
  return movieQuery.fetchAll();
};
