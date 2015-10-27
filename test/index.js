'use strict';

/* global suite, suiteSetup, test */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const read = require('../dist/read');
const parse = require('../dist/parse');

const noop = () => {};

suite('Parse', function() {
  const metrics = path.join(__dirname, 'fixtures', 'metrics.ldjson');
  let expected;

  suiteSetup(function() {
    expected = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'fixtures', 'parsed.json')).toString());
  });

  test('parses LDJSON', function(done) {
    return read(fs.createReadStream(metrics))
      .then(parse)
      .then(data => assert.deepEqual(data, expected))
      .then(noop)
      .then(done, done);
  });
});
