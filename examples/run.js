var settings = require('./settings');
var search = require('../lib/netsuite-saved-search')(settings);

function onFailure(err) {
  process.stderr.write("Fail boat: " + err.message + "\n");
  process.exit(1);
}

var searchId = 'customsearch_ingram_micro_feed';

search.run(searchId, function (err, results) {
  if (err) onFailure(err);

  search.cache(searchId, results, function (err) {
    if (err) onFailure(err);
    console.log(results);
  });
});
