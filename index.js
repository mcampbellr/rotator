#! /usr/bin/env node
const markers = require('./helpers/markers');
const flags = require('./helpers/flags');

(async () => {
  markers(flags);
})();
