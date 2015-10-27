raptor-parse [![Build Status][travisimage]][travislink]
============================================================

[travisimage]: https://travis-ci.org/stasm/raptor-parse.png?branch=master
[travislink]: https://travis-ci.org/stasm/raptor-parse

Parse Raptor's LDJSON metrics files into the following JSON hierarchy:

  - app origin
    - timestamp of the test series
      - performance metric
        - array of values

Usage
-----

    $ raptor-parse metrics.ldjson


API
---

You can also use _raptor-parse_ programmatically.  It exposes two functions 
for working with Raptor data: `read` reads in a LDJSON stream with the raw 
metrics data and `parse` aggregates the data into a JSON object.

```javascript
// Needed for Node.js 0.10 and 0.12.
require('babel/polyfill');

var fs = require('fs');
var rp = require('raptor-parse');

rp.read(fs.createReadStream(filename))
  .then(rp.parse)
  .then(console.log)
  .catch(console.error);
```


Installation
------------

    npm install -g raptor-parse
