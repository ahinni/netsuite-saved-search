// https://rest.netsuite.com/app/site/hosting/restlet.nl?script=324&deploy=1
function findItem(options) {
  if ( !options.itemid ) {
    return { error: 'Must provide the itemid of the saved search', options: options };
  }

  var filters = [
    new nlobjSearchFilter('itemid', null, 'equalto', options.itemid)
  ];

  var columns = [
    new nlobjSearchColumn('itemid')
  ];

  return nlapiSearchRecord('item', null, filters, columns);
}
