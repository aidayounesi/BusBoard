const request = require('request');
const BusStop = require('./BusStop');

class BusStopController {
    constructor() {
    }

    getBusStopsNearTo(lat, lon) {
        const url = 'https://api.tfl.gov.uk/StopPoint/';

        let reqParams = { 'lat': lat,
                            'lon': lon,
                            'stopTypes':['NaptanPublicBusCoachTram'],
                            'modes':['bus']};
        // return new pending promise
        return new Promise((resolve, reject) => {
            request.get({
                url: url,
                json: reqParams,
            }, function (error, response, body) {
                if (error != null)
                    reject(error);
                else if (response.statusCode === 404)
                    reject('Invalid lat/lon/types!');
                else
                    resolve(body);
            });
        }).then(data => JSON.parse(data));

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
     * @return Promise<Array<Arrival>>
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
}

module.exports = BusStopController;
