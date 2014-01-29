var _ = require('underscore');
var async = require('async');
var rest = require('restler');
var redis = require('redis');

module.exports = function(settings) {
  if (typeof settings === 'undefined' || !settings.netsuite) {
    throw("You must provide settings containing netsuite credentials");
  }

  var netsuite = settings.netsuite;
  var redisOptions = settings.redis; // completely optional
  var cachePrefix = settings.cachePrefix || "ss:";

  function run(searchId, callback) {
    var restOptions = {
      headers: {
        Authorization: 'NLAuth nlauth_account='+netsuite.account+',nlauth_email='+netsuite.email+',nlauth_signature='+netsuite.password+',nlauth_role='+netsuite.role,
        'Content-Type': 'application/json'
      }
    };

    function onError(error) {
      callback(error);
    }

    rest.get(netsuite.restlet+"&searchId="+searchId, restOptions).on('success', function (result) {
      callback(null, result);
    }).on('error', onError).on('fail', function (err) { onError(err.error); });
  }

  function cacheSavedSearch(searchId, results, callback) {
    var client = redis.createClient(redisOptions);
    client.set(cachePrefix + searchId, JSON.stringify(results), function (err, res) {
      client.quit();
      callback && callback(err, results);
    });
  }

  function fetchCached(searchId, callback) {
    var client = redis.createClient(redisOptions);
    client.get(cachePrefix + searchId, function (err, data) {
      var results = JSON.parse(data);
      client.quit();
      callback(err, results || []);
    });
  }

  function fetch(searchId, callback) {
    // try to read from cache
    // if empty, run the save search and then cache the results.
    var getCached = _.partial(fetchCached, searchId);
    function useCachedOrFetchThenCache(result, cb) {
      result.length > 0
        ? cb(null, result)
        : run(searchId, function (err, res) {cacheSavedSearch(searchId, res, cb)});
    }

    async.waterfall([
      getCached,
      useCachedOrFetchThenCache
    ], callback);
  }

  return {
    run: run,
    cache: cacheSavedSearch,
    fetchCached: fetchCached,
    fetch: fetch
  };
};