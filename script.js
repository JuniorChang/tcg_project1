// the map argument refers to the map which we create using Leaflet
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [randomLat, randomLng,];
}



let singapore = [1.29, 103.85]; // Singapore latlng
let map = L.map('map').setView(singapore, 13);
// map.setMaxBounds(map.getBounds());
// map.setMinZoom(12);

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// const lat = position.coords.latitude;
// const lon = position.coords.longitude;
// const popup = L.popup()
//     .setLatLng([1.43, 103.78])
//     .setContent("Your location.")
//     .openOn(map);

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;
    let popup = L.popup()
        .setLatLng([lat, lon])
        .setContent("Your location.")
        .openOn(map);
});




let xhr = new XMLHttpRequest();
xhr.open('GET', 'assets/gyms-sg-geojson.geojson');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function () {
    if (xhr.status !== 200) return
    // L.geoJSON(xhr.response).bindPopup("<p>Singapore</p>").addTo(map);
    L.geoJson(xhr.response, {
        onEachFeature: function (feature, layer) {
            // console.log(feature.properties.Description);
            layer.bindPopup(feature.properties.Description);
            let e = document.createElement('div');
            e.innerHTML = feature.properties.Description;
            let tds = e.querySelectorAll('td');
            let region = tds[13].innerHTML;
            let department = tds[10].innerHTML;
            let name = tds[8].innerHTML;
            layer.bindPopup(`<div>
                  <p>
                       Name: ${region}
                  </p>
                  <p>
                        Street Name: ${name}
                        </p>

                  <p>
                       Description: ${department}
                  </p>
               </div>`);
        }
    }).addTo(map);
};
xhr.send();






// Bmi calculator
function bmi() {
    let bmi = 0
    let h = 0
    let w = 0
    h = document.getElementById("height").value;
    w = document.getElementById("weight").value;
    bmi = w / (h * h);
    document.getElementById("BmiResult").value = bmi.toFixed(2);
    if (bmi >= 35) {
        document.getElementById("bmi-image").src = "assets/images/extremely obese.jpg";
        console.log("Extremely Obese");
    } else if (bmi >= 30 && bmi < 35) {
        document.getElementById("bmi-image").src = "assets/images/obese.jpg";
        console.log("Obese");
    } else if (bmi >= 25 && bmi < 29.9) {
        document.getElementById("bmi-image").src = "assets/images/overweight.jpg";
        console.log("Overweight");
    } else if (bmi >= 18.5 && bmi < 25) {
        document.getElementById("bmi-image").src = "assets/images/normal.jpg";
        console.log("Normal Range");
    } else {
        document.getElementById("bmi-image").src = "assets/images/underweight.jpg";
        console.log("Underweight");
    }
    console.log(bmi)
}
