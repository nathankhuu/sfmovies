'use strict';

const Knex         = require('../../../../lib/libraries/knex');
const MovieFactory = require('../../../../test/factories/movie');
const Movies       = require('../../../../lib/server');

const movieOne = MovieFactory.build({ name: 'One', release_year: 2000 });
const movieTwo = MovieFactory.build({ name: 'Two', release_year: 2010 });

describe('movies integration', () => {

  beforeEach(() => {
    return Knex.raw('TRUNCATE movies CASCADE');
  });

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('list', () => {

    beforeEach(() => {
      return Knex('movies').insert([movieOne, movieTwo]);
    });

    it('lists all movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result[0].object).to.eql('movie');
      });
    });

    it('filters by fuzzy title', () => {
      return Movies.inject({
        url: '/movies?title=Ome',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result[0].object).to.eql('movie');
        expect(response.result[0].title).to.eql('One');
      });
    });

  });

});
