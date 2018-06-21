
function getBusStopsArrivals() {
    var postCode = document.postCodeForm.postcode.value;

    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/departureBoards?postcode=${postCode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        showBusStopsArrivals(JSON.parse(this.responseText));
    };
    xhttp.send();
}

/**
 *
 * @param stopsJson
 */
function showBusStopsArrivals(stopsJson) {
    var results = document.getElementById("results");

    // remove all children
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    for (var i = 0; i < stopsJson.length; i++) {
        var heading = document.createElement("h3");
        heading.innerText = 'Stop ' + stopsJson[i].id;
        results.appendChild(heading);

        var arrivals = stopsJson[i].arrivals;
        var unorderdeBullets = document.createElement("ul");
        results.appendChild(unorderdeBullets);
        for (var j = 0; j < arrivals.length; j++) {
            var item = document.createElement("li");
            item.innerText = Math.round(arrivals[j].timeToStation/60)+' minutes: ' +
                            arrivals[j].lineName +' to '+ arrivals[j].destinationName;
            unorderdeBullets.appendChild(item);
        }
    }
}