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
    
