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
      FILTER_TEMPLATE = ['==', ['number', ['get', 'Year']], 0];

//-----------------------------Page Initialization------------------------------
/*window.addEventListener("load", init);

function init() {
  // Add scroll event listener
  id("story").addEventListener("scroll", () => {
    console.log('ok');
  });
}*/


let popup = q(".info-popup");

function showInfo() {
  popup.classList.remove("closed-pop");
}

function closeInfo() {
  if (!popup.classList.contains("closed-pop")) {
    popup.classList.add("closed-pop");
  }
}

let showing = Array.from({length: 30}, (_, i) => i + 1990);

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
  'filter': [
    'all',
    ['==', ['number', ['get', 'Year']], 1990],
    ['==', ['number', ['get', 'Year']], 1991]
  ],
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
    data: 'assets/90-07_DNR_Fire_Stats.geojson'
  });

  map.addSource('dnr-08-pre', {
    type: 'geojson',
    data: 'assets/08-pre_DNR_Fire_Stats.geojson'
  });

  // Default large fires map
  map.addLayer(large_fires);
  map.addLayer(pre_07);
  map.addLayer(aft_07);
});

//-------------------------------Map Toggles------------------------------------
// Map 1 toggle on/off

function toggleLayer(ele, lay) {
  ele.classList.toggle("selected");
  ele.classList.toggle("map-btns");
  if (ele.classList.contains("selected")) {
    map.setLayoutProperty(lay, 'visibility', 'visible');
  } else {
    map.setLayoutProperty(lay, 'visibility', 'none');
  }
}

//--------------------------------Year Toggles----------------------------------
function updateYrs(ele, yr) {
  ele.classList.toggle("selected-yrs");
  ele.classList.toggle("yr-btns");
  if (id("all-yrs").classList.contains("selected-yrs")) {
    id("all-yrs").classList.remove("selected-yrs");
    id("all-yrs").classList.add("yr-btns");
    showing = [];
  }
  if (id("no-yrs").classList.contains("selected-yrs")) {
    id("no-yrs").classList.remove("selected-yrs");
    id("no-yrs").classList.add("yr-btns");
  }
  if (ele.classList.contains("selected-yrs")){
    if (!showing.includes(yr)) {
      showing.push(yr);
    }
  } else {
    if (showing.includes(yr)) {
      showing.splice(showing.indexOf(yr), 1);
    }
    if (showing.length === 0) {
      id("no-yrs").classList.add("selected-yrs");
      id("no-yrs").classList.remove("yr-btns");
    }
  }
  console.log(showing);
  let new_filter = ["all"];
  for (let i = 0; i < showing.length; i++) {
    let temp = [...FILTER_TEMPLATE];
    temp.pop();
    temp.push(showing[i]);
    new_filter.push(temp);
  }
  console.log(new_filter);
  map.setFilter('lg-fire-polies', new_filter);
  map.setFilter('fires-pre-07', new_filter);
  map.setFilter('fires-aft-07', new_filter);
}

function clearAll() {
  let btns = qsa(".selected-yrs");
  for (const element of btns) {
    element.classList.toggle("selected-yrs");
    element.classList.toggle("yr-btns");
  }
  id("all-yrs").classList.add("selected-yrs");
  id("all-yrs").classList.remove("yr-btns");
  showing = Array.from({length: 30}, (_, i) => i + 1990);
  map.setFilter('lg-fire-polies', null);
  map.setFilter('fires-pre-07', null);
  map.setFilter('fires-aft-07', null);
}

function addAll() {
  let btns = qsa(".selected-yrs");
  for (const element of btns) {
    element.classList.toggle("selected-yrs");
    element.classList.toggle("yr-btns");
  }
  id("no-yrs").classList.add("selected-yrs");
  id("no-yrs").classList.remove("yr-btns");
  showing = [];
  let new_filter = ["all"];
  for (let i = 0; i < 30; i++) {
    let temp = [...FILTER_TEMPLATE];
    temp.pop();
    temp.push(i + 1990);
    new_filter.push(temp);
  }
  map.setFilter('lg-fire-polies', new_filter);
  map.setFilter('fires-pre-07', new_filter);
  map.setFilter('fires-aft-07', new_filter);
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

// Query Select All shortcut
function qsa(selector) {
  return document.querySelectorAll(selector);
}