
function getBusStopsArrivals() {
    var postCode = document.postCodeForm.postcode.value;

    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/departureBoards?postcode=${postCode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {

        var results = document.getElementById("results");

        // remove all children
        while (results.firstChild) {
            results.removeChild(results.firstChild);
        }

        var stops = JSON.parse(this.responseText);
        for (var i = 0; i < stops.length; i++) {
            var heading = document.createElement("h3");
            heading.innerText = 'Stop ' + stops[i].id;
            results.appendChild(heading);

            var arrivals = stops[i].arrivals;
            var unorderdeBullets = document.createElement("ul");
            results.appendChild(unorderdeBullets);
            for (var j = 0; j < arrivals.length; j++) {
                var item = document.createElement("li");
                item.innerText = Math.round(arrivals[j].timeToStation/60)+' minutes: ' + arrivals[j].lineName +' to '+ arrivals[j].destinationName;
                unorderdeBullets.appendChild(item);
            }
        }
    };
    xhttp.send();
}