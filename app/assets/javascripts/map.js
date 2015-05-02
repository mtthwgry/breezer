$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoibXR0aHdncnkiLCJhIjoibW82OTJicyJ9.ykVo84aS5xtK3jPy_iX6Sg';

  var map = L.mapbox.map('map', 'mtthwgry.bcb9b827', { zoomControl: false })
  .setView([37.771167, -122.402504], 13);
});