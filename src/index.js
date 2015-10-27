'use strict';

const fs = require('fs');

const read = require('./read');
const parse = require('./parse');

function main(filename) {
  return read(fs.createReadStream(filename))
    .then(parse)
    .then(data => JSON.stringify(data, null, 2))
    .then(json => console.log(json))
    .catch(err => console.log(err.stack));
}

exports.main = main;
