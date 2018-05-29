'use strict';

exports.up = (Knex) => {
  return Knex.raw('UPDATE movies SET name = title WHERE name IS NULL');
};

exports.down = (Knex, Promise) => {
  return Promise.resolve();
};
