// Define variables for holding our canvas and maps
let myMap
let canvas
const mappa = new Mappa('Leaflet')
let coords_text // coordinates showing on screen
let coords = [] // recorded coordinates
let recording = false // if we are recording or not
let wasDragged = false

// Define points of interest
let london = {
  lat: 51.5074,
  lng: -0.1278
}

// Set up the options for our map
const options = {
  lat: london.lat,
  lng: london.lng,
  zoom: 13,
  style: tiles_library.osm.url
}

function setup() {
  // Create a canvas on which to draw the map
  canvas = createCanvas(800, 600)

  // Create map with the options
  myMap = mappa.tileMap(options)

  // Draw the map on the canvas
  myMap.overlay(canvas,function () {
    myMap.map.invalidateSize();
});

  coords_text = createElement('p', "Map coordinate finder.  Click on the map for a point.  Click Start to start a route.  Click Copy to copy points to clipboard.")
  coords_text.position(0, 600);

  // Create a text element to show the coordinates
  coords_text = createElement('p', "")
  coords_text.position(0, 650);

  // Create buttons
  startButton = createButton('Start');
  startButton.position(0, 700);
  startButton.mousePressed(startRecording);

  stopButton = createButton('Stop');
  stopButton.position(50, 700);
  stopButton.mousePressed(stopRecording);
  stopButton.attribute('disabled', '');
  
  deleteButton = createButton('Del');
  deleteButton.position(100, 700);
  deleteButton.mousePressed(deletePoint); 

  copyButton = createButton('Copy');
  copyButton.position(150, 700);
  copyButton.mousePressed(copyToClipboard);

  clearButton = createButton('Clear');
  clearButton.position(200, 700);
  clearButton.mousePressed(clearRoute);  
  
  cursor(CROSS)
}



function startRecording() {
  // Called when the start button is pressed
  recording = true
  coords = []
  stopButton.removeAttribute('disabled');
  startButton.attribute('disabled', '');
}

function stopRecording() {
  // Called when the stop button is pressed
  recording = false
  startButton.removeAttribute('disabled');
  stopButton.attribute('disabled', '');
}

function deletePoint() {
  coords.pop()
}

function clearRoute() {
  // Called when the clear button is pressed
  coords = []
}

function copyToClipboard() {
  // Called when the copy button is pressed
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = JSON.stringify(coords);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function draw() {
  // Clear the canvas on every frame
  clear()

  // Plot the recorded route
  stroke("red")
  strokeWeight(5)
  noFill()
  plotRoute(coords, false, true)

}


function mouseClicked() {
  if (wasDragged)
    wasDragged = false
  else if (mouseX < width && mouseY < height) {
    // Clear list if not recording
    if (!recording) {
      coords = []
    }

    // Get lat/lng for point clicked
    let mouse_coords = myMap.pixelToLatLng(mouseX, mouseY);
    mouse_coords.lat = mouse_coords.lat.toFixed(4)
    mouse_coords.lng = mouse_coords.lng.toFixed(4)

    // Show the coords of the mouse
    coords_text.html(`{lat:${mouse_coords.lat}, lng:${mouse_coords.lng}}`)

    // Add it to the list
    append(coords, mouse_coords)
  }
}

function mouseDragged() {
  // If mouse was dragged, remember this so we don't record it as a coordinate
  wasDragged = true
  // prevent default
  return false;
}