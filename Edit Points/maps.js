// Define a list of tile options
let tiles_library = {
  osm:{url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'},
  stamen_toner:{url:'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', attribution: '&copy; <a href="http://maps.stamen.com/">Stamen Design</a>'},
  stamen_terrain:{url:'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', attribution: '&copy; <a href="http://maps.stamen.com/">Stamen Design</a>'},
  stamen_watercolor:{url:'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', attribution: '&copy; <a href="http://maps.stamen.com/">Stamen Design</a>'},	
}

function plotRoute(route, closed = false, points = false) {
  if (route.length > 0) {
    beginShape()
    for (let i = 0; i < route.length; i++) {
      pos = myMap.latLngToPixel(route[i].lat, route[i].lng)
      vertex(pos.x, pos.y)
      if (points)
        circle(pos.x, pos.y, 5)
    }
    closed ? endShape(CLOSE) : endShape()
  }
}

