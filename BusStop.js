class BusStop {
    constructor(id, arrivals) {
        this.id = id;
        this.arrivals = arrivals;
    }

    /**
     * @return {string} a representation of next {arrivalsLimit} arrivals
     */
    toString() {
        const arrivalsRegex = /([0-9]+-[0-9]+-[0-9]+)T([0-9]+:[0-9]+:[0-9]+)Z/;
        const arrivalsLimit = 5;

        let nextArrivalsTime = this.arrivals.slice(0, arrivalsLimit)
                                            .map(arrivals =>
                                                arrivals.expectedArrival.match(arrivalsRegex)[2]).join('\n');
        return `The next five arrivals at stop ${this.id} are:\n${nextArrivalsTime}`;
    }
}

module.exports = BusStop;
