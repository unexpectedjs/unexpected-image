/* global unexpected:true */
/* exported unexpected */
unexpected = require('unexpected')
  .clone()
  .installPlugin(require('../lib/unexpectedImage'));
