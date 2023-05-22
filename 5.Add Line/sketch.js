// Define variables for holding our canvas and maps
let myMap
let canvas
const mappa = new Mappa('Leaflet')

// Define points of interest
let london = {lat:51.5074, lng:-0.1278}
let elephant_tree = {lat:51.5168, lng:-0.3093}
let ealing_broadway = {lat:51.5149, lng:-0.3019}
let gunnersbury_park = {lat:51.4979, lng:-0.2925}

// Set up the options for our map
const options = {
  lat: ealing_broadway.lat,
  lng: ealing_broadway.lng,
  zoom: 13,
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
  circle(pos.x, pos.y, 20)
  
  // Draw a line on the map
  let start = ealing_broadway
  let stop = gunnersbury_park
  let startpix = myMap.latLngToPixel(start.lat, start.lng) // convert lng/lat to pixels
  let stoppix = myMap.latLngToPixel(stop.lat, stop.lng)// convert lng/lat to pixels
  stroke("blue")
  strokeWeight(5)
  line(startpix.x, startpix.y, stoppix.x, stoppix.y)
}
