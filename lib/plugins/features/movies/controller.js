'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const moviePayload = { name: payload.title, release_year: payload.release_year };
  return new Movie().save(moviePayload)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

exports.list = () => {
  return new Movie().fetchAll();
};
