var expect = require('chai').expect;
var fixtures = require('./fixtures/raw');
var ns = require('../examples/restlet_script');

describe('netsuite restlet helpers', function () {
  var expected = {
    "id": "1155",
    "recordtype": "inventoryitem",
    "columns": {
      "itemid": "1416N",
      "custitem_onlinedescript": "Avaya 1416 Digital Telephone (700469869) Unused",
      "unitprice": 135,
      "pricelevel": {
          "name": "IC",
          "internalid": "3"
      },
      "locationquantityonhand": 14,
      "inventorylocation": {
          "name": "Finished Goods (TS001)",
          "internalid": "3"
      },
      "modified": "1/27/2014 5:49 pm"
    }
  };

  describe('translateRawValue', function () {
    it('stringifies text', function () {
      expect(ns.translateRawValue({type: "text"}, {value: 'foo'})).eql('foo');
    });

    it('uses a number for curreny', function () {
      expect(ns.translateRawValue({type: "currency2"}, {value: '135.00'})).eql(135);
      expect(ns.translateRawValue({type: "currency2"}, {value: '135.23'})).eql(135.23);
    });

    it('uses a number for floats', function () {
      expect(ns.translateRawValue({type: "float"}, {value: '47'})).eql(47);
      expect(ns.translateRawValue({type: "float"}, {value: '47.23'})).eql(47.23);
    });

    it('objectifies a select field', function () {
      expect(ns.translateRawValue({type: "select"}, { text: 'Finished Goods (TS001)', value: '3' })).eql({
        name: "Finished Goods (TS001)",
        internalid: "3"
      });
    });

    it('booleanifies a checkbox field', function () {
      expect(ns.translateRawValue({type: "checkbox"}, {value: 'T'})).eql(true);
      expect(ns.translateRawValue({type: "checkbox"}, {value: 'F'})).eql(false);
    });

    it('stringifies date/datetime', function () {
      expect(ns.translateRawValue({type: "datetime"}, {value: '1/27/2014 5:49 pm'})).eql('1/27/2014 5:49 pm');
      expect(ns.translateRawValue({type: "date"}, {value: '1/27/2014'})).eql('1/27/2014');
    });
  });

  describe('translateRawColumns', function () {
    it('translates columns like nlapiSearchRecord', function () {
      var columns = ns.translateRawColumns(fixtures.single);
      expect(columns).eql(expected.columns);
    });
  });

  describe('translateRaw', function () {
    it('translates into format returned by nlapiSearchRecord', function () {
      var actual = ns.translateRaw(fixtures.single);
      expect(actual.id).eql(expected.id);
      expect(actual.recordtype).eql(expected.recordtype);
      expect(actual.columns).eql(expected.columns);
    });
  });
});
