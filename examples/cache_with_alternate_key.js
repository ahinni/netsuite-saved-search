var settings = require('./settings');
var search = require('../lib/netsuite-saved-search')(settings);

function onFailure(err) {
  process.stderr.write("Fail boat: " + err.message + "\n");
  process.exit(1);
}

var searchId = 'customsearch_ingram_micro_feed';
var filters = [
  ['modified', null, 'onOrAfter', '1/30/2015 12:00 am']
];

// This will try the cached version first, if not there will run and then cache
search.fetch(searchId, { forceRefresh: true, filters: filters, searchKey: 'foo' }, function (err, results) {
  if (err) onFailure(err);
  console.log(results);
});
