var domain = 'http://localhost:3000'

function setBusStopsArrivals() {
    var postCode = document.postCodeForm.postcode.value;

    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', `${domain}/departureBoards?postcode=${postCode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        displayBusStopsArrivals(document.getElementById('results'),
                                JSON.parse(this.responseText));
    };
    xhttp.send();
}

/**
 * @param htmlElement the html element that bus stops should be added to
 * @param stopsJson JSON array of bus stops contatinig id and arrivals
 */
function displayBusStopsArrivals(htmlElement, stopsJson) {
    // remove all children
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild);
    }

    var title = document.createElement('h2');
    title.innerText = 'Results';
    htmlElement.appendChild(title);

    for (var i = 0; i < stopsJson.length; i++) {
        var heading = document.createElement('h3');
        heading.innerText = 'Stop ' + stopsJson[i].id;
        htmlElement.appendChild(heading);

        var arrivals = stopsJson[i].arrivals;
        var unorderdeBullets = document.createElement('ul');
        htmlElement.appendChild(unorderdeBullets);
        for (var j = 0; j < arrivals.length; j++) {
            var item = document.createElement('li');
            item.innerText = Math.round(arrivals[j].timeToStation/60)+' minutes: ' +
                            arrivals[j].lineName +' to '+ arrivals[j].destinationName;
            unorderdeBullets.appendChild(item);
        }
    }
}

function navigateToHistory() {
    window.location.href = `${domain}/history`;
}


function setHistoryBlog() {
    resp = [{'date':'12 Dec 2017', 'title':'Title1', 'description': 'Description 123', 'image': 'https://www.softwire.com/wp-content/uploads/2018/02/david-lloyd.jpg'},
        {'date':'16 Jan 2018', 'title':'Title2', 'description': 'Description 456', 'image':'https://www.softwire.com/wp-content/uploads/2018/02/bbc.jpg'},
        {'date':'5 Dec 2017', 'title':'Title3', 'description': 'Description 789'}];

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
        console.log(postsDataJson[post]);
        displayOnePost(htmlElement, postsDataJson[post]);
    }
}

/**
 * @param htmlElement the html element that a post should be added to
 * @param postDataJson JSON object of a post
 */
function displayOnePost(htmlElement, postDataJson) {

    // a dictionary that matches the values and type of a post element
    // should be in oder of expected html items
    var postElementsDataStyle = {
        'h2':postDataJson.title ,
        'h5':postDataJson.date,
        'p':postDataJson.description };

    for (var key in postElementsDataStyle) {
        // check if the property/key is defined in the object itself, not in parent
        if (postElementsDataStyle.hasOwnProperty(key)) {
            var newChild = document.createElement(key);
            newChild.innerText = postElementsDataStyle[key];
            htmlElement.appendChild(newChild);
        }
    }
    if (postDataJson.image != null) {
        var newChild = document.createElement('img');
        newChild.src = postDataJson.image;
        htmlElement.appendChild(newChild);
    }

}