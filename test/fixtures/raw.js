module.exports = {
  single: {
      "type": "inventoryitem",
      "id": "1155",
      "rawValues": [{
          "index": "1",
          "name": "itemid",
          "value": "1416N"
      }, {
          "index": "2",
          "name": "custitem_onlinedescript",
          "value": "Avaya 1416 Digital Telephone (700469869) Unused"
      }, {
          "index": "3",
          "name": "unitprice",
          "value": "135.00"
      }, {
          "index": "4",
          "text": "IC",
          "name": "pricelevel",
          "value": "3"
      }, {
          "index": "5",
          "name": "locationquantityonhand",
          "value": "14"
      }, {
          "index": "6",
          "text": "Finished Goods (TS001)",
          "name": "inventorylocation",
          "value": "3"
      }, {
          "index": "7",
          "name": "modified",
          "value": "1/27/2014 5:49 pm"
      }],
      "rawColumns": [{
          "name": "itemid",
          "join": null,
          "summary": null,
          "type": "text",
          "label": "Name",
          "functionid": null,
          "formula": null,
          "sortdir": "ASC",
          "index": 1,
          "userindex": 1,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }, {
          "name": "custitem_onlinedescript",
          "join": null,
          "summary": null,
          "type": "text",
          "label": "Online Description",
          "functionid": null,
          "formula": null,
          "sortdir": null,
          "index": 2,
          "userindex": 2,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }, {
          "name": "unitprice",
          "join": "pricing",
          "summary": null,
          "type": "currency2",
          "label": "Unit Price",
          "functionid": null,
          "formula": null,
          "sortdir": null,
          "index": 3,
          "userindex": 3,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }, {
          "name": "pricelevel",
          "join": "pricing",
          "summary": null,
          "type": "select",
          "label": "Price Level",
          "functionid": null,
          "formula": null,
          "sortdir": null,
          "index": 4,
          "userindex": 4,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }, {
          "name": "locationquantityonhand",
          "join": null,
          "summary": null,
          "type": "float",
          "label": "Location On Hand",
          "functionid": null,
          "formula": null,
          "sortdir": null,
          "index": 5,
          "userindex": 5,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }, {
          "name": "inventorylocation",
          "join": null,
          "summary": null,
          "type": "select",
          "label": "Inventory Location",
          "functionid": null,
          "formula": null,
          "sortdir": null,
          "index": 6,
          "userindex": 6,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }, {
          "name": "modified",
          "join": null,
          "summary": null,
          "type": "datetime",
          "label": "Last Modified",
          "functionid": null,
          "formula": null,
          "sortdir": null,
          "index": 7,
          "userindex": 7,
          "whenorderedby": null,
          "whenorderedbyjoin": null
      }],
      "valuesByIdx": [null, {
          "index": "1",
          "name": "itemid",
          "value": "1416N"
      }, {
          "index": "2",
          "name": "custitem_onlinedescript",
          "value": "Avaya 1416 Digital Telephone (700469869) Unused"
      }, {
          "index": "3",
          "name": "unitprice",
          "value": "135.00"
      }, {
          "index": "4",
          "text": "IC",
          "name": "pricelevel",
          "value": "3"
      }, {
          "index": "5",
          "name": "locationquantityonhand",
          "value": "14"
      }, {
          "index": "6",
          "text": "Finished Goods (TS001)",
          "name": "inventorylocation",
          "value": "3"
      }, {
          "index": "7",
          "name": "modified",
          "value": "1/27/2014 5:49 pm"
      }],
      "valuesByKey": {
          "itemid": {
              "index": "1",
              "name": "itemid",
              "value": "1416N"
          },
          "custitem_onlinedescript": {
              "index": "2",
              "name": "custitem_onlinedescript",
              "value": "Avaya 1416 Digital Telephone (700469869) Unused"
          },
          "pricing_unitprice": {
              "index": "3",
              "name": "unitprice",
              "value": "135.00"
          },
          "pricing_pricelevel": {
              "index": "4",
              "text": "IC",
              "name": "pricelevel",
              "value": "3"
          },
          "locationquantityonhand": {
              "index": "5",
              "name": "locationquantityonhand",
              "value": "14"
          },
          "inventorylocation": {
              "index": "6",
              "text": "Finished Goods (TS001)",
              "name": "inventorylocation",
              "value": "3"
          },
          "modified": {
              "index": "7",
              "name": "modified",
              "value": "1/27/2014 5:49 pm"
          }
      }
  }
};
