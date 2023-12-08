'use strict';

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

const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

sendAjaxRequest(difficulty).then((response) => {
    /*response tässä on json lista kaikista airporteista. Reponsea voidaan käyttää markkereiden outputtaamiseen. */
    console.log(response);
    createMarkers(response);
});
/* last destination uses red marker */
var redMarker = L.AwesomeMarkers.icon({
    icon: 'plane',
    markerColor: 'red'
});
var greenMarker = L.AwesomeMarkers.icon({
    icon: 'plane',
    markerColor: 'green'
});

let first_airport;
let last_airport;

function createMarkers(airports) {
    for (let i = 0; i < airports.length; i++) {

        if (i === 0) {
            first_airport = airports[i];
            const first_marker = L.marker([first_airport[2], first_airport[3]], {icon: redMarker}).addTo(mymap);
            console.log("first airport: " + first_airport);
        }
        if (i === airports.length - 1) {
            last_airport = airports[i];
            const last_marker = L.marker([last_airport[2], last_airport[3]], {icon: redMarker}).addTo(mymap);
            console.log("last airport: " + last_airport);
        }

        const airport = airports[i];
        const marker = L.marker([airport[2], airport[3]]).addTo(mymap);
    }
}

let mymap;

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
