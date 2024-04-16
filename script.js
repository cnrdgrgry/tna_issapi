const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

async function requestISSLocation() {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // once we have the new ISS location, update the page
      updateISSLocation(data);
    }
  } catch (error) {
    console.error("Error is:" + error);
  }
}

// update the latitude and longitude displayed on the page
function updateISSLocation(data) {
  var latitudeElement = document.querySelector(".latitude");
  latitudeElement.textContent = data.latitude;

  var longitudeElement = document.querySelector(".longitude");
  longitudeElement.textContent = data.longitude;

  let daylightElement = document.querySelector(".daylight");
  daylightElement.textContent = data.visibility;

  //updating the marker position
  marker.setLatLng([data.latitude, data.longitude]);

  //centering the map on the marker
  map.panTo([data.latitude, data.longitude], true);
}

// listen for clicks on the button
var updateButton = document.querySelector(".update");
updateButton.addEventListener("click", requestISSLocation);

// also update location on page load and every 5 seconds thereafter.
requestISSLocation();
setInterval(requestISSLocation, 30000);

// create the map using leafletjs
var map = L.map("map").setView([0, 0], 3);

// set the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
19;

//add marker to the map of ISS location
var marker = L.marker([0, 0]).addTo(map);
marker
  .bindPopup(
    "<b>This is the location of ISS over Earth.</b><br>speeding through space at 17,500mph"
  )
  .openPopup();
