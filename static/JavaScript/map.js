'use strict';

async function sendAjaxRequest(difficulty){
    try {
        const response = await fetch(`http://127.0.0.1:5000/difficulty/${difficulty}`);
        const jsonData = await response.json();
        return Promise.resolve(jsonData)
    }catch (err){
        console.log(err);
        return Promise.reject(err)
    }
}

const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

sendAjaxRequest(difficulty).then((response) => {
    /*response tässä on json lista kaikista airporteista. Reponse muuttujaa voidaan käyttää markkereiden outputtaamiseen. */
    console.log(response);
    createMarkers(response);
});

var mymap = L.map('map').setView([51.505, -0.09], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// const coordinates = [
//     [37.7749, -122.4194],
//     [40.7128, -74.0060],
//     [34.0522, -118.2437],
// ];
//
// for (let i = 0; i < coordinates.length; i++) {
//     const marker = L.marker(coordinates[i]).addTo(map);
// }