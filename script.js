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

    return [ randomLat, randomLng,];
}



let singapore = [ 1.29,103.85]; // Singapore latlng
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

// // create marker cluster
// let markerClusterLayer = L.markerClusterGroup();

// for (let i = 0; i < 1000; i++) {
//     let pos = getRandomLatLng(map);
//     L.marker(pos).addTo(markerClusterLayer);
// }
// markerClusterLayer.addTo(map);




// 1st group
let group= L.layerGroup(); // 1. create the layer group
L.marker(getRandomLatLng(map)).addTo(group);  // 2. add markers to the group
L.marker(getRandomLatLng(map)).addTo(group);
L.marker(getRandomLatLng(map)).addTo(group);

// add the group layer to the map
group.addTo(map); // 3. add the layer to the map

let group2 = L.layerGroup();
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map), {
    color: 'red',
    fillColor:"orange",
    fillOpacity:0.5,
    radius: 500
}).addTo(group2);
}

let group3 = L.layerGroup();
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map), {
    color: 'red',
    fillColor:"green",
    fillOpacity:0.5,
    radius: 250
}).addTo(group3);
}

let hdbLayer = L.layerGroup();
let response;
async function getHDBLayer(){
    let hdbResponse = await axios.get("data/hdb.json");
    response = hdbResponse.data;
    console.log('Running function: getHDBLayer')
    console.log(hdbResponse)
    for (let obj of hdbResponse.data) {
        const {name, coordinates} = obj;
        L.circle(coordinates, {
            color: 'purple',
            fillColor:'purple',
            fillOpacity:0.5,
            radius:700
        }).bindPopup(`<p> ${name}</p>`).addTo(hdbLayer);
    }
    return;
}

let mallsLayer = L.layerGroup();
async function getMallsLayer(){
    let mallsResponse = await axios.get("data/malls.json");
    response = mallsResponse.data;
    console.log('Running function: getmallsLayer')
    console.log(mallsResponse)
    for (let obj of mallsResponse.data) {
        const {name, coordinates} = obj;
        L.circle(coordinates, {
            color: 'yellow',
            fillColor:'red',
            fillOpacity:0.5,
            radius:700
        }).bindPopup(`<p> ${name}</p>`).addTo(mallsLayer);
    }
    return;
}

let natureLayer = L.layerGroup();
async function getNatureLayer(){
    let natureResponse = await axios.get("data/nature.json");
    response = natureResponse.data;
    console.log('Running function: getNaturesLayer')
    console.log(natureResponse)
    for (let obj of natureResponse.data) {
        const {name, coordinates} = obj;
        L.circle(coordinates, {
            color: 'blue',
            fillColor:'black',
            fillOpacity:0.5,
            radius:700
        }).bindPopup(`<p> ${name}</p>`).addTo(natureLayer);
    }
    return;
}


async function addMapLayers(){
    await getHDBLayer();
    await getMallsLayer();
    await getNatureLayer();
    console.log('Before Layer is added');
    console.log(response)
    let baseLayers ={
        'Markers': group,
        'Circles': group2,
        'HDB': hdbLayer,
        'Malls': mallsLayer,
        'Natures': natureLayer
    }
    
    let overlays = {
        'Green Circle':group3
    
    }

    L.control.layers(baseLayers, overlays).addTo(map);
    console.log('All functions code: After map layer is added');
    console.log(response)
}

window.addEventListener('DOMContentLoaded', async (event) => {
    // setup event listeners here
    await addMapLayers();
    console.log('All function code: After map layer is done');
    console.log(response)
});



document.querySelector('#toggle-btn').addEventListener('click', function(){
    // use hasLayer() to check if the map already have the shopping layer group
    // reminder: group2 contains all the circles
            if (map.hasLayer(group2)) {
                map.removeLayer(group2);
            } else {
                  map.addLayer(group2);
            }
    })


// let monza = [1.3521,103.8198]; // #1 Singapore latlng
// let map = L.map('map').setView(monza, 15); // #2 Set the center point

// // setup the tile layers
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
// }).addTo(map);

// let singaporeMarker = L.marker([1.29, 103.85]);
// singaporeMarker.addTo(map);
// singaporeMarker.bindPopup("<p>Singapore</p>")
// // singaporeMarker.addEventListener('click', function(){
// //     alert("Singapore");
// // })

// let circle = L.circle([1.35166526, 103.773663572], {
//     color: 'red',
//     fillColor:"orange",
//     fillOpacity:0.5,
//     radius: 500
// })

// // add it to the map
// circle.addTo(map);

// let singaporeZoo = L.marker([1.4043,103.7930]);
// singaporeZoo.addTo(map);
// singaporeZoo.bindPopup("<p>Singapore Zoo</p>")

// let singaporeDiscoveryCentre = L.marker([1.3327,103.6789]);
// singaporeDiscoveryCentre.addTo(map);
// singaporeDiscoveryCentre.bindPopup("<p>Singapore Discovery Centre</p>")


// //2nd and 3rd line can combine as one sentence as shown
// let jurongBirdPark = L.marker([1.3187,103.7064]);
// jurongBirdPark.addTo(map).bindPopup("<p> Jurong Bird Park</p>")