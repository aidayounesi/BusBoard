const request = require('request');
const BusStop = require('./BusStop');

class BusStopController {
    constructor() {
    }

    /**
     * @param stopId
     * @return Promise<BusStop>
     */
    getBusStop(stopId) {
        return this.getArrivals(stopId)
            .then(arrivals => new BusStop(stopId, arrivals));
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
     * @param howMany
     * @return  Array<Promise<BusStop> with the length of howMany>
     */
    getSomeBusStopsObjNearTo(postCodeObj, howMany) {
        return this.getSomeBusStopsInfoNearTo(postCodeObj, howMany)
                        .then(manyStopsInfo =>
                            manyStopsInfo.map(stopInfo =>
                                this.getBusStop(stopInfo.id)
                            )
                        );
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
