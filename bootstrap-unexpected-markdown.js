/* global unexpected:true */
unexpected = require('unexpected');
// There's a bug in unexpected-markdown that causes npm test
// not to work unless this is done on the global instance:
unexpected.output.preferredWidth = 80;
unexpected = unexpected.clone();
unexpected.use(require('./lib/unexpectedImage'));
