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
  style: 'mapbox://styles/mapbox/dark-v11', // style URL
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
    'fill-color': '#00FF00',
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

function playSection1() {
  if (!id("l1").classList.contains("selected")) {
    toggleLayer(id("l1"), 'lg-fire-polies');
  }
  checkLayer(id('l2'), 'fires-pre-07');
  checkLayer(id('l3'), 'fires-aft-07');
  addAll();
  temp_btns = qsa(".yr-btns:not(#all-yrs)");
  map.flyTo({
    //47.03068646971769, -121.49784562530579
    center: [-121.50, 47.4],
    zoom: 6.3
  });
  let i = 0;
  setTimeout(function run() {
    console.log(i);
    updateYrs(temp_btns[i], parseInt(temp_btns[i].innerText));
    i++;
    if (i < 30) {
      setTimeout(run, 300);
    }
  }, 300);
}

function playSection2() {
  if (!id("l2").classList.contains("selected")) {
    toggleLayer(id("l2"), 'fires-pre-07');
  }
  checkLayer(id('l1'), 'lg-fire-polies');
  checkLayer(id('l3'), 'fires-aft-07');
  addAll();
  temp_btns = qsa(".yr-btns:not(#all-yrs)");
  map.flyTo({
    //47.03068646971769, -121.49784562530579
    center: [-121.50, 47.4],
    zoom: 6.3
  });
  let i = 0;
  setTimeout(function run() {
    console.log(i);
    updateYrs(temp_btns[i], parseInt(temp_btns[i].innerText));
    i++;
    if (i < 18) {
      setTimeout(run, 300);
    }
  }, 300);
}

function playSection3() {
  if (!id("l3").classList.contains("selected")) {
    toggleLayer(id("l3"), 'fires-aft-07');
  }
  checkLayer(id('l1'), 'lg-fire-polies');
  checkLayer(id('l2'), 'fires-pre-07');
  addAll();
  temp_btns = qsa(".yr-btns:not(#all-yrs)");
  map.flyTo({
    //47.03068646971769, -121.49784562530579
    center: [-121.50, 47.4],
    zoom: 6.3
  });
  let i = 18;
  setTimeout(function run() {
    console.log(i);
    updateYrs(temp_btns[i], parseInt(temp_btns[i].innerText));
    i++;
    if (i < 30) {
      setTimeout(run, 300);
    }
  }, 300);
}

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
    if (id("l1").classList.contains("selected")) {
      map.setLayoutProperty('lg-fire-polies', 'visibility', 'visible');
    }
    if (id("l2").classList.contains("selected")) {
      map.setLayoutProperty('fires-pre-07', 'visibility', 'visible');
    }
    if (id("l3").classList.contains("selected")) {
      map.setLayoutProperty('fires-aft-07', 'visibility', 'visible');
    }
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
  if (showing.length === 30) {
    clearAll();
    return;
  }
  let new_filter = ["any"];
  for (let i = 0; i < showing.length; i++) {
    let temp = [...FILTER_TEMPLATE];
    temp.pop();
    temp.push(showing[i]);
    new_filter.push(temp);
  }
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
  if (id("l1").classList.contains("selected")) {
    map.setLayoutProperty('lg-fire-polies', 'visibility', 'visible');
  }
  if (id("l2").classList.contains("selected")) {
    map.setLayoutProperty('fires-pre-07', 'visibility', 'visible');
  }
  if (id("l3").classList.contains("selected")) {
    map.setLayoutProperty('fires-aft-07', 'visibility', 'visible');
  }
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
  map.setLayoutProperty('lg-fire-polies', 'visibility', 'none');
  map.setLayoutProperty('fires-pre-07', 'visibility', 'none');
  map.setLayoutProperty('fires-aft-07', 'visibility', 'none');
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

function checkLayer(ol, lay) {
  if (ol.classList.contains("selected")) {
    toggleLayer(ol, lay);
  }
}