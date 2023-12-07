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
    console.log(response);
    createMarkers(response);
});

var mymap = L.map('map').setView([51.505, -0.09], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);


var marker = L.marker([51.5, -0.09]).addTo(mymap);

marker.bindPopup("<b>Hello world!</b><br>This is a popup.").openPopup();
