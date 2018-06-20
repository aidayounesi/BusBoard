const request = require('request');
const BusStop = require('./BusStop');

class BusStopController {
    constructor() {
    }

    /**
     * @param stopId
     * @param howMany
     * @return Promise<BusStop>
     */
    getBusStop(stopId, howMany) {
        return this.getSomeArrivals(stopId, howMany)
            .then(arrivals => new BusStop(stopId, arrivals));
    }

    /**
     * @param stopId
     * @return Promise<Array<arrival> sliced by howmany>
     */
    getSomeArrivals(stopId, howMany) {
        return this.getArrivals(stopId)
            .then(arrival =>
                arrival.sort((a, b) =>
                    parseInt(a.timeToStation) - parseInt(b.timeToStation)).slice(0, howMany));
    }

    /**
     * @param stopId
     * @return Promise<Array<arrival>>
     */
    getArrivals(stopId) {
        const url = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals`;

        // return new pending promise
        return new Promise((resolve, reject) => {

            request(url, function (error, response, body) {
                if (error != null)
                    reject(error);
                else if (response.statusCode === 404)
                    reject('Invalid stop number!');
                else
                    resolve(body);
            });
        }).then(data => JSON.parse(data));
    }

    /**
     *
     * @param postCodeObj
     * @param howManyStops
     * @param howManyArrivals
     * @return  Promise<Array<BusStop>> with the length of howMany>
     */
    getSomeBusStopsObjNearTo(postCodeObj, howManyStops, howManyArrivals) {
        return this.getSomeBusStopsInfoNearTo(postCodeObj, howManyStops)
                        .then(manyStopsInfo =>
                            Promise.all(manyStopsInfo.map(stopInfo => this.getBusStop(stopInfo.id, howManyArrivals))));
    }

    /**
     * @param postCodeObj
     * @param howMany
     * @return Promise<Array<stopPoints> with the length of howMany>
     */
    getSomeBusStopsInfoNearTo(postCodeObj, howMany) {
        return this.getBusStopsInfoNearTo(postCodeObj)
            .then(stopsInfo =>
                    stopsInfo.sort((a, b) =>
                        parseInt(a.distance) - parseInt(b.distance)).slice(0, howMany));
    }

    /**
     * @param postCodeObj
     * @return {Promise<Array<stopPoints>}
     */
    getBusStopsInfoNearTo(postCodeObj) {
        const url = 'https://api.tfl.gov.uk/StopPoint';

        let queryParams = {
            'lat': postCodeObj.lat,
            'lon': postCodeObj.lon,
            'stopTypes':['NaptanPublicBusCoachTram'],
            'modes':['bus']
        };

        // return new pending promise
        return new Promise((resolve, reject) => {
            request({url:url, qs:queryParams, useQuerystring:true}, function(error, response, body) {
                if (error != null)
                    reject(error);
                else if (response.statusCode === 404)
                    reject('Invalid lat/lon/types!');
                else
                    resolve(body);
            });
        }).then(data => JSON.parse(data).stopPoints);
    }
}

module.exports = BusStopController;
