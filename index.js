#! /usr/bin/env node
const markers = require('./helpers/markers')
const flags = require('./helpers/flags')

;(async () => {
  // Check if the flags contains the mark and unmark
  markers(flags)
})()
