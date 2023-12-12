'use strict';

//Lista pelaajan valitsemista lentokentistä
//This list needs to be sent as json to backend. In python we can use json.loads() to convert it to a list and then use it to calculate the distance between the markers

let mymap;

const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

sendAjaxRequest(difficulty).then((response) => {
    /*response tässä on json lista kaikista airporteista. Reponsea voidaan käyttää markkereiden outputtaamiseen. */
    console.log(response);
    createMarkers(response);
});

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

/* last destination uses red marker first destination uses green*/
/* current destination uses blue marker */
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

let clicked_markers = [];
let marker_list = [];

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

function createMarkers(airports) {

    const startPoint = L.marker([airports[0][2], airports[0][3]], {icon: blueMarker}).addTo(mymap);
    clicked_markers.push(startPoint);
    const lastPoint = L.marker([airports[airports.length - 1][2], airports[airports.length - 1][3]], {icon: redMarker}).addTo(mymap);
    startPoint.bindPopup(`<b>Start point</b><br>${airports[0][1]}`);

    for (let i = 1; i < airports.length; i++) {
        const marker = L.marker([airports[i][2], airports[i][3]], {
            icon: greenMarker,
            airportName: airports[i][0]
        }).addTo(mymap);
        let airport_name = marker.options.airportName;
        //testaus alla airportin nimen saamiseksi
        console.log(airport_name);
        //testaus loppuu
        marker_list.push(marker);

        if (i === airports.length - 1) {
            marker.bindPopup(`<b>Destination</b><br>${airports[i][1]}`);
            marker.setIcon(redMarker);
        }

        marker.on('click', function (e) {

            if (clicked_markers.includes(marker)) {
                return;
            }

            console.log(marker, 'marker')
            console.log(lastPoint, 'lastpoint')

            // While the player has not clicked all the markers
            if (clicked_markers.length < marker_list.length) {

                // Check if the marker is the last one (destination)
                if (marker._latlng.lat === lastPoint._latlng.lat && marker._latlng.lng === lastPoint._latlng.lng) {
                    alert('You cannot click the last marker first!')
                    return;
                }
            }

            airport_name = marker.options.airportName;

            console.log("Clicked marker:", marker);
            var info = document.getElementById("h2content")
            info.innerText = "You are currently at: " + marker.options['airportName'];
            marker.setIcon(blueMarker);
            clicked_markers.push(marker);
            for (let j = 0; j < clicked_markers.length - 1; j++) {
                clicked_markers[j].setIcon(greyMarker);
            }
            console.log(clicked_markers.length)
            console.log(marker_list.length)
            if (clicked_markers.length === marker_list.length + 1) {
                const marker_cordiantes = clicked_markers.map(marker => marker.getLatLng());
                sendAjaxRequest2(marker_cordiantes).then((response) => {
                    console.log("Received response:", response);
                    const distance = response.Response;
                    document.getElementById('h2content').innerText = 'You traveled ' + distance + ' km';
                    document.getElementById('rerun').innerText = 'Try again?';

                });
            }
        });
    }
}

