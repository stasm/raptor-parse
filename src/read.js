'use strict';

import ndjson from 'ndjson';
import {
  __, divide, either, evolve, filter, map, partial, pipe, propEq, when
} from 'ramda';

const isMeasure = propEq('key', 'measure');
const isMemory = propEq('key', 'memory');
const isDatapoint = either(isMeasure, isMemory);

const memToMB = when(
  isMemory,
  evolve({ fields: { value: divide(__, 1024 * 1024) } }));

module.exports = function(stream) {
  return new Promise((resolve, reject) => {
    const data = [];
    const aggregate = pipe(
      filter(isDatapoint),
      map(memToMB),
      points => data.push(...points));
    const done = partial(resolve, [data]);

    stream
      .pipe(ndjson.parse())
      .on('data', aggregate)
      .on('end', done)
      .on('error', reject);
  });
};
