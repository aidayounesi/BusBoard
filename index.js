const BusStopController = require('./BusStopController.js')
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter bus stop number: ', stopId => {
    const busStopController = new BusStopController();

    // let stopId = '490008660N';
    busStopController.getBusStop(stopId)
        .then(busStop => console.log(busStop.toString()))
        .catch(error => console.log(error));

    rl.close();
});
