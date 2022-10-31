var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var newrelic = require('newrelic');

var RestaurantRecord = require('./model').Restaurant;
var MemoryStorage = require('./storage').Memory;

var API_URL_VALIDATION = '/api/validation';
var API_URL_ORDER = '/api/checkout';

let apiValidationCallback = function (req, res, _next) {
  console.log('apiValidationCallback.ccnum.length', req.body.ccnum.length);

  if (req.body.ccnum.length <= 15) {
    let err = new Error('payments.js, cardNumber is invalid');
    newrelic.noticeError(err);
    return res.status(400).send(err);
  }

  return res.status(200).send();
};

let apiCheckoutCallback = function (req, res, _next) {
  return res.status(201).send({ orderId: Date.now() });
};

exports.start = function (PORT, STATIC_DIR, DATA_FILE) {
  var app = express();
  var storage = new MemoryStorage();

  // log requests
  app.use(logger('combined'));

  // serve static files for demo client
  app.use(express.static(STATIC_DIR));

  // parse body into req.body
  app.use(bodyParser.json());

  // set header to prevent cors errors
  app.use(function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'),
      res.setHeader(
        'Access-Control-Allow-Headers',
        'newrelic, tracestate, traceparent, content-type'
      ),
      next();
  });

  // API
  app.post(API_URL_ORDER, apiCheckoutCallback);

  app.post(API_URL_VALIDATION, apiValidationCallback);

  // start the server
  // read the data from json and start the server
  fs.readFile(DATA_FILE, function (_err, data) {
    JSON.parse(data).forEach(function (restaurant) {
      storage.add(new RestaurantRecord(restaurant));
    });

    app.listen(PORT, function () {
      console.log('http://localhost:' + PORT + '/');
    });
  });

  // Windows and Node.js before 0.8.9 would crash
  // https://github.com/joyent/node/issues/1553
  //  try {
  //    process.on('SIGINT', function() {
  //      // save the storage back to the json file
  //      fs.writeFile(DATA_FILE, JSON.stringify(storage.getAll()), function() {
  //        process.exit(0);
  //      });
  //    });
  //  } catch (e) {}
};
