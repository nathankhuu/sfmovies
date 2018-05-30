'use strict';

exports.up = function (Knex) {
  return Knex.raw('CREATE EXTENSION fuzzystrmatch');
};

exports.down = function (Knex) {
  return Knex.raw('DROP EXTENSION fuzzystrmatch');
};
