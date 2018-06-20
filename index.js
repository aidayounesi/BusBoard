const express = require('express');
const BusStopController = require('./BusStopController.js');
const PostCodeController = require('./PostCodeController.js');

const app = express();
const postCodeController = new PostCodeController();
const busStopController = new BusStopController();

const arrivalsNoLimit = 5;
const busStopNoLimit = 2;

app.get('/departureBoards/:postcode', (req, res, next) =>
    postCodeController.getPostCode(req.params.postcode)
        .then(postCode => busStopController.getSomeBusStopsObjNearTo(postCode, busStopNoLimit, arrivalsNoLimit))
        .then(data => res.send(data))
        .catch(error => next(error)));

app.listen(3000, () => console.log('App listening on port 3000!'))
