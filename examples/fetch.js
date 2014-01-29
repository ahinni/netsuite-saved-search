var settings = require('./settings');
var search = require('../lib/netsuite-saved-search')(settings);

function onFailure(err) {
  process.stderr.write("Fail boat: " + err.message + "\n");
  process.exit(1);
}

var searchId = 'customsearch_ingram_micro_feed';

// This will try the cached version first, if not there will run and then cache
search.fetch(searchId, function (err, results) {
  if (err) onFailure(err);
  console.log(results);
});
