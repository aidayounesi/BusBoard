class BusStop {
    constructor(id, arrivals) {
        this.id = id;
        this.arrivals = arrivals;
    }

    /**
     * @return {string} a representation of next {arrivalsLimit} arrivals
     */
    toString() {
        const arrivalsPrintLimit = 5;

        let prettyArrivalsOutput = '';
        this.arrivals.forEach( arrival =>
            prettyArrivalsOutput += `In ${Math.round(arrival.timeToStation/60.0)} mins, towards ${arrival.towards}, destination: ${arrival.destinationName}\n` );

        return `The next five arrivals at stop ${this.id} are:\n${prettyArrivalsOutput}`;
    }
}

module.exports = BusStop;
