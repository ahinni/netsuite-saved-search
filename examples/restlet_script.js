function translateRaw( raw ) {
  var result = {
    id: raw.id,
    recordtype: raw.type,
    columns: translateRawColumns( raw )
  };

  return result;
}

function translateRawColumns( raw ) {
  if ( !raw.rawColumns ) return undefined;
  var columns = {};
  raw.rawColumns.forEach( function (col, index) {
    var key = col.name;
    var value = translateRawValue(col, raw.rawValues[index]);
    columns[key] = value;
  });

  return columns;
}

function translateRawValue(column, val) {
  if ( column.type === 'float' || column.type.match(/^currency/) ) return +val.value;
  if ( column.type === 'select' ) return { name: val.text, internalid: val.value };
  if ( column.type === 'checkbox' ) return val.value === 'T';
  return val.value;
}

//COPY
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
//END_COPY

module.exports = {
  translateRaw: translateRaw,
  translateRawColumns: translateRawColumns,
  translateRawValue: translateRawValue
}

/*
function executeSavedSearch(options) {
  if ( !options.searchId ) {
    return { error: 'Must provide the searchId of the saved search', options: options };
  }
  return nlapiSearchRecord(null, options.searchId, null, null);
}
*/
