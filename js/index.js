/**
This is the script for index.html
Contributors: group AB5
Edited by Frost
*/

//----------------------------------Constants-----------------------------------
// Circle radii for the acres burned map.
const BURNED_ACRES = [1, 10, 100];
      BA_COLORS = ['rgb(255,247,188)','rgb(254,196,79)','rgb(217,95,14)'];
      BA_RADII = [5, 15, 30];

window.addEventListener("load", init);

function init() {
  // Add scroll event listener
  id("story").addEventListener("scroll", () => {
    console.log('ok');
  });
}

let popup = q(".info-popup");

function showInfo() {
  popup.classList.remove("closed-pop");
}

function closeInfo() {
  if (!popup.classList.contains("closed-pop")) {
    popup.classList.add("closed-pop");
  }
}

// Setup mapbox basemap
mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJvc3R5Y3MiLCJhIjoiY2xlbTluMXJ2MHp1dzN4bWxlcmRqcGM2eCJ9.e2bM-nuMkNqXTGDvasGjyQ';
map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
  // 48.02576218511146, -120.34574297329345
  center: [-120.34, 48.02], // starting position [lng, lat]
  zoom: 8, // starting zoom
  projection: 'mercator'
});

// Construct Layers
// Large Fires layer
let large_fires = {
  'id': 'lg-fire-polies',
  'type': 'fill',
  'source': 'large-fires',
  'layout': {
    // Make the layer visible by default.
    'visibility': 'visible'
  },
  'paint': {
    'fill-color': '#fc5603',
    'fill-opacity': 0.4
  }
};

// Acres Burned before 2007.
let pre_07 = {
  'id': 'fires-pre-07',
  'type': 'circle',
  'source': 'dnr-90-07',
  'layout': {
    'visibility': 'none'
  },
  'paint': {
    'circle-radius': {
      'property': 'ACRES_BURNED',
      'stops': [
        [BURNED_ACRES[0], BA_RADII[0]],
        [BURNED_ACRES[1], BA_RADII[1]],
        [BURNED_ACRES[2], BA_RADII[2]]
      ]
    },
    'circle-color': {
      'property': 'ACRES_BURNED',
      'stops': [
        [BURNED_ACRES[0], BA_COLORS[0]],
      [BURNED_ACRES[1], BA_COLORS[1]],
      [BURNED_ACRES[2], BA_COLORS[2]]
      ]
    },
    'circle-stroke-color': 'black',
    'circle-stroke-width': 1,
    'circle-opacity': 0.6
  }
}

let aft_07 = {
  'id': 'fires-aft-07',
  'type': 'circle',
  'source': 'dnr-08-pre',
  'layout': {
    'visibility': 'none'
  },
  'paint': {
    'circle-radius': {
      'property': 'ACRES_BURNED',
      'stops': [
        [BURNED_ACRES[0], BA_RADII[0]],
        [BURNED_ACRES[1], BA_RADII[1]],
        [BURNED_ACRES[2], BA_RADII[2]]
      ]
    },
    'circle-color': {
      'property': 'ACRES_BURNED',
      'stops': [
        [BURNED_ACRES[0], BA_COLORS[0]],
      [BURNED_ACRES[1], BA_COLORS[1]],
      [BURNED_ACRES[2], BA_COLORS[2]]
      ]
    },
    'circle-stroke-color': 'black',
    'circle-stroke-width': 1,
    'circle-opacity': 0.6
  }
}

// Large fires data set
map.on('load', () => {
  map.addSource('large-fires', {
    type: 'geojson',
    data: 'assets/Washington_Large_Fires_1973-2020.geojson'
  });

  map.addSource('dnr-90-07', {
    type: 'geojson',
    data: 'assets/DNR_Fire_Statistics_1970-2007.geojson'
  });

  map.addSource('dnr-08-pre', {
    type: 'geojson',
    data: 'assets/DNR_Fire_Statistics_2008_-_Present.geojson'
  });

  // Default large fires map
  map.addLayer(large_fires);
  map.addLayer(pre_07);
  map.addLayer(aft_07);
});

//-------------------------------Map Toggles------------------------------------
// Map 1 toggle on/off

function toggleLayer(ele, lay) {
  console.log(ele.classList, lay)
  ele.classList.toggle("selected");
  ele.classList.toggle("map-btns");
  if (ele.classList.contains("selected")) {
    map.setLayoutProperty(lay, 'visibility', 'visible');
  } else {
    map.setLayoutProperty(lay, 'visibility', 'none');
  }
}

/*------------------------------Helper functions------------------------------*/
// Get id shortcut.
function id(idName) {
  return document.getElementById(idName);
}

// Query shrotcut
function q(query) {
  return document.querySelector(query);
}