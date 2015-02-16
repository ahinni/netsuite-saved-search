var _ = require('underscore');
var async = require('async');
var rest = require('restler');
var redis = require('redis');

module.exports = function(settings) {
  if (typeof settings === 'undefined' || !settings.netsuite) {
    throw("You must provide settings containing netsuite credentials");
  }

  var netsuite = settings.netsuite;
  var redisOptions = _.defaults(settings.redis || {}, {
    host: '127.0.0.1',
    port: 6379,
    cachePrefix: 'ss:'
  });

  function run(searchId, options, callback) {
    if ( typeof options === "function" ) {
      callback = options;
      options = {};
    }

    var restOptions = {
      headers: {
        Authorization: 'NLAuth nlauth_account='+netsuite.account+',nlauth_email='+netsuite.email+',nlauth_signature='+netsuite.password+',nlauth_role='+netsuite.role,
        'Content-Type': 'application/json'
      }
    };

    function onError(error) {
      callback(error);
    }

    var filters = options.filters ? "&filters="+encodeURIComponent(JSON.stringify(options.filters)) : ''

    rest.get(netsuite.restlet+"&searchId="+searchId+filters, restOptions).on('success', function (result) {
      callback(null, result);
    }).on('error', onError).on('fail', function (err) { onError(err.error); });
  }

  function cacheSavedSearch(searchKey, results, callback) {
    var client = redis.createClient(redisOptions.port, redisOptions.host);
    client.set(redisOptions.cachePrefix + searchKey, JSON.stringify(results), function (err, res) {
      client.quit();
      callback && callback(err, results);
    });
  }

  function fetchCached(searchKey, callback) {
    var client = redis.createClient(redisOptions.port, redisOptions.host);
    client.get(redisOptions.cachePrefix + searchKey, function (err, data) {
      var results = JSON.parse(data);
      client.quit();
      callback(err, results || []);
    });
  }

  function fetch(searchId, options, callback) {
    if ( typeof options === "function" ) {
      callback = options;
      options = {};
    }
    var searchKey = options.searchKey || searchId;
    // try to read from cache
    // if empty, run the save search and then cache the results.
    var getCached = _.partial(fetchCached, searchKey);
    function useCachedOrFetchThenCache(result, cb) {
      if (result.length > 0) cb(null, result);
      else {
        run(searchId, options, function (err, res) {
          if (err) cb(err, res);
          else cacheSavedSearch(searchKey, res, cb);
        });
      }
    }

    if (options.forceRefresh) {
      useCachedOrFetchThenCache([], callback);
    } else {
      async.waterfall([
        getCached,
        useCachedOrFetchThenCache
      ], callback);
    }
  }

  return {
    run: run,
    cache: cacheSavedSearch,
    fetchCached: fetchCached,
    fetch: fetch
  };
};
