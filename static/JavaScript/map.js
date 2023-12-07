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

function createMarkers(airports){
    for (let i = 0; i < airports.length; i++) {
      const airport = airports[i];
      const marker = L.marker([airport[2], airport[3]]).addTo(mymap);
    }
    return;
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
