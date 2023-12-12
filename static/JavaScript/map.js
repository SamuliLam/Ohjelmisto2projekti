'use strict';

// function to fetch the user selected difficulty.
async function sendAjaxRequest(difficulty) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/difficulty/${difficulty}`);
        const jsonData = await response.json();
        return Promise.resolve(jsonData)
    } catch (err) {
        console.log(err);
        return Promise.reject(err)
    }
}

// A function to send the list of markers to the backend
async function sendAjaxRequest2(clicked_markers) {
    try {
        console.log("Sending data:", clicked_markers);  // Check if clicked_markers is not empty or undefined
        const response = await fetch('http://127.0.0.1:5000/game/airport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clicked_markers)
        });
        const jsonData = await response.json();
        var totalDistanceTraveled = Promise.resolve(jsonData);
        return totalDistanceTraveled;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}


// A function to create markers on the map and aswell all the functionalities that are related to the markers
function Markers(airports) {
    const startPoint = L.marker([airports[0][2], airports[0][3]], {icon: blueMarker}).addTo(mymap); // Used to create the starting point
    clicked_markers.push(startPoint); // Adds the starting point to the clicked_markers list
    const lastPoint = L.marker([airports[9][2], airports[9][3]], {icon: redMarker}).addTo(mymap); // Used to create the last point

    startPoint.bindPopup(`<b>Start point</b><br>${airports[0][1]}`);

    // for loop for creating the markers on the map
    for (let i = 1; i < airports.length; i++) {
        const marker = L.marker([airports[i][2], airports[i][3]], {
            icon: greenMarker,
            airportName: airports[i][0]
        }).addTo(mymap);
        let airport_name = marker.options.airportName;
        console.log(airport_name);
        marker_list.push(marker);

        if (i === airports.length - 1) {
            marker.bindPopup(`<b>Destination</b><br>${airports[i][1]}`);
            marker.setIcon(redMarker);
        } else {
            if (clicked_markers.includes(marker) === false) {
                marker.on('click', function (e) {
                    current_marker = marker;
                    airport_name = current_marker.options.airportName;

                    console.log("Clicked marker:", marker);
                    // used to display the information about the marker
                    var info = document.getElementById("h2content")
                    info.innerText = "You are currently at: " + marker.options['airportName'];
                    marker.setIcon(blueMarker);
                    clicked_markers.push(marker);
                    for (let j = 0; j < clicked_markers.length - 1; j++) {
                        clicked_markers[j].setIcon(greyMarker);
                    }
                    // check if all markers have been clicked
                    if (clicked_markers.length === marker_list.length) {
                        clicked_markers.push(lastPoint);
                        const marker_coordinates = clicked_markers.map(marker => marker.getLatLng());
                        sendAjaxRequest2(marker_coordinates).then((response) => {
                            console.log("Received response:", response);
                            const distance = response.Response;
                            document.getElementById('h2totaldistance').innerText = 'You traveled ' + distance + ' km';
                            document.getElementById('rerun').innerText = 'Try again?';
                        });
                    }
                });
            } else {
                alert("You have already selected this destination.");
            }

        }

    }

}

const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

sendAjaxRequest(difficulty).then((response) => {
    console.log(response);
    Markers(response);
});
/* last destination uses red marker first destination uses green*/
/* current destination uses blue marker */
/* already selected markers use a grey marker */
var greenMarker = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconAnchor: [12, 40]
});
var redMarker = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconAnchor: [12, 40]
});
var blueMarker = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconAnchor: [12, 40]
});
var greyMarker = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconAnchor: [12, 40]
});

// Global variables
let current_marker = null;
let clicked_markers = [];
let marker_list = [];

let mymap;

// Used to create the map and set the view based on the difficulty
if (difficulty === 'easy') {
    mymap = L.map('map').setView([64.0, 26.0], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
} else if (difficulty === 'medium') {
    mymap = L.map('map').setView([50.0, 15.0], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
} else if (difficulty === 'hard') {
    mymap = L.map('map').setView([0.0, 0.0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
}