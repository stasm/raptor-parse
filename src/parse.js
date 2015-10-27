'use strict';

import {
  append, assocPath, compose, lensProp, path, reduce, over, slice, unless
} from 'ramda';


function parse(results, point) {
  const context = point.tags.context;
  const series = slice(0, point.timestamp.length - 6, point.timestamp);
  const metric = point.tags.metric;
  const value = point.fields.value;

  const leaf = [context, series, metric];
  const fill = unless(
    path(leaf), assocPath(leaf, []));

  const lens = compose(
    lensProp(context), lensProp(series), lensProp(metric));

  return over(
    lens, append(value), fill(results));
}

module.exports = reduce(parse, {});
