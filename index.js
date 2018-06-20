const BusStopController = require('./BusStopController.js')
const PostCodeController = require('./PostCodeController.js')
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the post code: ', postCodeStr => {

    const postCodeController = new PostCodeController();
    const busStopController = new BusStopController();

    postCodeController.getPostCode(postCodeStr)
        .then(postCode => busStopController.getSomeBusStopsObjNearTo(postCode, 2)
            .then(data => Promise.all(data).then(data=>console.log(data.toString())))
            .catch(error => console.log(error)))
        .catch(error => console.log(error));

    rl.close();
});
