var settings = require('./settings');
var search = require('../lib/netsuite-saved-search')(settings);

function onFailure(msg) {
  process.stderr.write("Fail boat: " + msg + "\n");
  process.exit(1);
}

search.fetchCached('customsearch_ingram_micro_feed', function (err, results) {
  console.log(results);
});
