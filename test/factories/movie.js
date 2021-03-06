'use strict';

const Factory = require('rosie').Factory;

const MovieFactory = new Factory()
  .sequence('id', (i) => i.toString())
  .attr('name', 'Name');

module.exports = MovieFactory;
