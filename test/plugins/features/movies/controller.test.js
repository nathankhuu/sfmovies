'use strict';

const Controller   = require('../../../../lib/plugins/features/movies/controller');
const Knex         = require('../../../../lib/libraries/knex');
const MovieFactory = require('../../../../test/factories/movie');

const movieOne = MovieFactory.build({ name: 'One', release_year: 2000 });
const movieTwo = MovieFactory.build({ name: 'Two', release_year: 2010 });

describe('movie controller', () => {

  beforeEach(() => {
    return Knex.raw('TRUNCATE movies CASCADE');
  });

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.title);
      });
    });

  });

  describe('list', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    });

    it('lists all movies', () => {
      return Controller.list()
      .then((movies) => {
        expect(movies).to.have.lengthOf(2);
      });
    });

    it('filters movies by year', () => {
      const query = { start_year: 2000, end_year: 2009 };
      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.lengthOf(1);
      });
    });

    it('filters movies by title', () => {
      const query = { title: 'One' };
      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.lengthOf(1);
      });
    });

  });

});
