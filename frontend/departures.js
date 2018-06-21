var domain = 'http://localhost:3000'

/**
 * To be called when the post code form is submitted
 */
function setBusStopsArrivals() {
    showLoader();
    hideResult();

    var postCode = document.postCodeForm.postcode.value;

    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', `${domain}/departureBoards?postcode=${postCode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {

        var result = document.getElementById('results');

        removeAllChildren(result);
        hideLoader();

        if (xhttp.status === 200)
            displayBusStopsArrivals(result,
                                JSON.parse(this.responseText));
        else
            displayError(result, this.responseText);

        showResult();
    };
    xhttp.send();
}

/**
 * @param htmlElement the html element that bus stops should be added to
 * @param stopsJson JSON array of bus stops contatinig id and arrivals
 */
function displayBusStopsArrivals(htmlElement, stopsJson) {

    if (stopsJson.length === 0)
        displayError(htmlElement, 'No bus stop nearby!');

    for (var i = 0; i < stopsJson.length; i++) {

        // using a divs to be able to style them
        var stop = document.createElement('div');
        if (i % 2 === 0)
            stop.classList.add('rightcolumn');
        else
            stop.classList.add('leftcolumn');

        var heading = document.createElement('div');
        heading.innerText = 'Stop ' + stopsJson[i].id;
        heading.classList.add('headersmall');
        stop.appendChild(heading);

        var arrivals = stopsJson[i].arrivals;
        var table = document.createElement('table');

        //add first row or header
        var header = table.createTHead();
        var row = header.insertRow();
        var cell = row.insertCell();
        cell.innerText = 'Bus';
        cell = row.insertCell();
        cell.innerText = 'minutes';

        //add other rows, one row per arrival
        var body = table.createTBody();
        for (var j = 0; j < arrivals.length; j++) {
            var tr =body.insertRow();

            var td = tr.insertCell();
            td.innerText = arrivals[j].lineName +' towards '+ arrivals[j].destinationName;

            td = tr.insertCell();
            var minutes = Math.round(arrivals[j].timeToStation/60);
            if (minutes === 0)
                minutes = 'Due';
            td.innerText = minutes;
        }
        stop.appendChild(table);
        htmlElement.appendChild(stop);
    }
}

/**
 * To be called on loading of blog page
 */
function setHistoryBlog() {
    resp = [{'date':'12 Dec 2017', 'title':'Title1', 'description': 'Description 123', 'image': 'https://www.softwire.com/wp-content/uploads/2018/02/david-lloyd.jpg'},
        {'date':'16 Jan 2018', 'title':'Title2', 'description': 'Description 456', 'image':'https://www.softwire.com/wp-content/uploads/2018/02/bbc.jpg'}];

    // var xhttp = new XMLHttpRequest();

    // xhttp.open('GET', `${domain}/blog`, true);
    // xhttp.setRequestHeader('Content-Type', 'application/json');
    // xhttp.onload = function() {
        displayPosts(document.getElementById('posts'),
            (resp));
    // };
    // xhttp.send();
}

/**
 * @param htmlElement the html element that all posts should be added to
 * @param postsDataJson JSON array of all the posts
 */
function displayPosts(htmlElement, postsDataJson) {
    for (var post in postsDataJson) {
        // using a divs to be able to style them
        var postElement = document.createElement('div');
        if (post % 2 === 0)
            postElement.classList.add('rightcolumn');
        else
            postElement.classList.add('leftcolumn');

        displayOnePost(postElement, postsDataJson[post]);
        htmlElement.appendChild(postElement);
    }
}

/**
 * @param htmlElement the html element that a post should be added to
 * @param postDataJson JSON object of a post
 */
function displayOnePost(htmlElement, postDataJson) {
    var newChild = document.createElement('h2');
    newChild.innerText = postDataJson.title;
    newChild.classList.add('card');
    htmlElement.appendChild(newChild);

    newChild = document.createElement('h5');
    newChild.innerText = postDataJson.date;
    htmlElement.appendChild(newChild);

    newChild = document.createElement('p');
    newChild.innerText = postDataJson.description;
    htmlElement.appendChild(newChild);

    if (postDataJson.image != null) {
        newChild = document.createElement('img');
        newChild.src = postDataJson.image;
        htmlElement.appendChild(newChild);
    }
}

/**
 * @param htmlElement the html element that the error should be displayed in
 * @param error
 */
function displayError(htmlElement, error) {
    var newChild = document.createElement('h1');
    newChild.classList.add('header');
    newChild.innerText = 'Ooops! ' + error;
    htmlElement.appendChild(newChild);
}

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function showResult() {
    document.getElementById("results").style.display = "block";
}

function hideResult() {
    document.getElementById("results").style.display = "none";
}

function removeAllChildren(htmlElement) {
    // remove all children
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild);
    }
}
