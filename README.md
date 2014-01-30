netsuite-saved-search
=====================

Node module wrapping making restlet call to execute a saved search in netsuite.

## Installation
    npm install netsuite-saved-search
    
## Configuration
Set up a restlet in netsuite that can generically invoke a saved search.

```javascript
function executeSavedSearch(options) {
  if ( !options.searchId ) {
    return { error: 'Must provide the searchId of the saved search', options: options };
  }
  return nlapiSearchRecord(null, options.searchId, null, null);
}
```

NOTE: the above can run into the 1000 record limit with netsuite. An
alternative script to use is something like this:

```javascript
function executeSavedSearch(options) {
  if ( !options.searchId ) {
    return { error: 'Must provide the searchId of the saved search', options: options };
  }

  var SLICE_LIMIT = 1000;
  var search = nlapiLoadSearch(null, options.searchId);
  var resultset = search.runSearch();

  var results = [];

  var index = 0;
  do {
    var subset = resultset.getResults(index, index+1000);
    if ( !subset ) break;
    subset.forEach( function (row) {
      results.push(row);
      index++;
    });
  } while (subset.length === SLICE_LIMIT);

  return results;
}
```

Once this restlet is deployed, make a note of the ```External URL``` in the deployment. Example:

    https://rest.netsuite.com/app/site/hosting/restlet.nl?script=90210&deploy=1
    
## Settings

Create a ```settings.js``` somewhere with your netsuite credentials and restlet url

### Required netsuite settings

```javascript
module.exports = {
  netsuite: {
    account: "1234567",
    email: "mynetsuiteaccount@here.tld",
    password: "p4ssw0rd",
    role: "3",
    restlet: "https://rest.netsuite.com/app/site/hosting/restlet.nl?script=90210&deploy=1"
  }
};
```

### Redis Options 
If you don't want to use the standard redisClient settings, you can add a ```redis``` option to the options:

```javascript
module.exports = {
  netsuite: {
    ...
  },
  redis: {
     host: 'a.b.c.d',
     port: 90210,
     cachePrefix: "blah:"
  }
};
```    
## Usage
Check out some of the examples in the examples directory.

```javascript
var settings = require('./config/settings');
var search = require('netsuite-saved-search')(settings);
    
// This will try the cached version first, if not there will run and then cache
search.fetch('customsearch_upinhere', function (err, results) {
  if (err) onFailure(err);
  console.log(results);
});
```

### Cache Refresh
If you want to force a refresh of the cached results, pass in the options ```{ forceRefresh: true}```

    search.fetch('customsearch_upinhere', { forceRefresh: true }, function (err, results) {...

### Filters
An array of filters can be passed into the netsuite saved search:

```javascript
var filters = [
  ['modified', null, 'onOrAfter', '1/30/2014 12:00 am']
];
search.fetch(searchId, { forceRefresh: true, filters: filters },
```
    
## TODO
* Add optional EXPIRE times to the redis keys 
