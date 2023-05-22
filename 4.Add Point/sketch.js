// Define variables for holding our canvas and maps
let myMap
let canvas
const mappa = new Mappa('Leaflet')

// Define points of interest
let london = {lat:51.5074, lng:-0.1278}
let elephant_tree = {lat:51.5168, lng:-0.3093}

// Set up the options for our map
const options = {
  lat: london.lat,
  lng: london.lng,
  zoom: 10,
  style: tiles_library.stamen_watercolor.url
}

function setup(){
  // Create a canvas on which to draw the map
  canvas = createCanvas(640,640)

  // Create map with the options
  myMap = mappa.tileMap(options)

  // Draw the map on the canvas
  myMap.overlay(canvas)
}


function draw(){
   // Clear the canvas on every frame
  clear()
  
  // Draw a red circle at a point on the map
  let pos = myMap.latLngToPixel(elephant_tree.lat, elephant_tree.lng) // convert lng/lat to pixels
  fill("red")
  noStroke()
  circle(pos.x, pos.y, 20);
}
