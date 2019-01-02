/*global unexpected:true*/
unexpected = require('unexpected');
unexpected = unexpected.clone();
unexpected.output.preferredWidth = 80;
unexpected.use(require('./lib/unexpectedImage'));
