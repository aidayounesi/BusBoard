const express = require('express');
const BusStopController = require('./BusStopController.js');
const PostCodeController = require('./PostCodeController.js');

const app = express();
const postCodeController = new PostCodeController();
const busStopController = new BusStopController();

const arrivalsNoLimit = 5;
const busStopNoLimit = 2;

app.use(express.static('frontend'));
app.use('/history', express.static('frontend/history.html'));

app.get('/departureBoards', (req, res, next) =>
    postCodeController.getPostCode(req.query.postcode)
        .then(postCode => busStopController.getSomeBusStopsObjNearTo(postCode, busStopNoLimit, arrivalsNoLimit))
        .then(data => {res.type('json');res.send(data);})
        .catch(error => res.status(500).send(error)));

app.listen(3000, () => console.log('App listening on port 3000!'))
