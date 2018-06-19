const BusStopController = require('./BusStopController.js')
const PostCodeController = require('./PostCodeController.js')
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the post code: ', postCodeStr => {

    const postCodeController = new PostCodeController();

    // let postCodeStr = 'OX49 5NU';
    postCodeController.getPostCode(postCodeStr)
        .then(postCode => console.log(postCode))
        .catch(error => console.log(error));


    // const busStopController = new BusStopController();
    //
    // // let stopId = '490008660N';
    // busStopController.getBusStop(stopId)
    //     .then(busStop => console.log(busStop.toString()))
    //     .catch(error => console.log(error));

    rl.close();
});
