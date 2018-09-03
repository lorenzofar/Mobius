const MAP_CENTER = { lat: 45.465, lon: 9.186 }; // Coordinates of Milan
var locations;

$(document).ready(() => {
  $.get("/locations")
    .done(parseLocations)
    .catch(handleError);
});

function parseLocations(data) {
  locations = data;
  data.forEach(l =>
    $("#locations-container").loadTemplate($("#locationCardTemplate"), l, {
      append: true
    })
  );
}

function pinLocations() {
  let map = new Microsoft.Maps.Map(document.getElementById("map"), {
    showMapTypeSelector: false,
    center: new Microsoft.Maps.Location(MAP_CENTER.lat, MAP_CENTER.lon)
  });
  map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.grayscale });
  locations.forEach(l => {
    if (l && l.lat && l.lon) {
      var latLon = new Microsoft.Maps.Location(l.lat, l.lon);
      var pushpin = new Microsoft.Maps.Pushpin(latLon, {
        title: l.name,
        color: "#FF3B30"
      });
      map.entities.push(pushpin);
    }
  });
}
