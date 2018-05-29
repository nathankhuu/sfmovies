'use strict';

const Controller   = require('../../../../lib/plugins/features/movies/controller');
const Knex         = require('../../../../lib/libraries/knex');
const MovieFactory = require('../../../../test/factories/movie');

const movieOne = MovieFactory.build({ title: 'One', release_year: 2000 });
const movieTwo = MovieFactory.build({ title: 'Two', release_year: 2010 });

describe('movie controller', () => {

  beforeEach(() => {
    return Knex.raw('TRUNCATE movies CASCADE');
  });

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

  });

  describe('list', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    });

    it('lists all movies', () => {
      return Controller.list()
      .then((response) => {
        expect(response).to.have.lengthOf(2);
      });
    });

  });

});
