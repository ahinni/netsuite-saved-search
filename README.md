netsuite-saved-search
=====================

Node module wrapping making restlet call to execute a saved search in netsuite.

## Installation
    npm install netsuite-saved-search
    
## Configuration
Set up a restlet in netsuite that can generically invoke a saved search.

    function executeSavedSearch(options) {
      if ( !options.searchId ) {
        return { error: 'Must provide the searchId of the saved search', options: options };
      }
      return nlapiSearchRecord(null, options.searchId, null, null);
    }

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

If you want to force a refresh of the cached results, pass in the options ```{ forceRefresh: true}```

    search.fetch('customsearch_upinhere', { forceRefresh: true }, function (err, results) {...
    
## TODO
I haven't tried (or needed to) pass any arguments into the generic saved search restlet. I'd like to be able to do this, as I believe some searches will at least need to be able to take a date range.
