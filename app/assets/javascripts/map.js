$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoibXR0aHdncnkiLCJhIjoibW82OTJicyJ9.ykVo84aS5xtK3jPy_iX6Sg';

  var map = L.mapbox.map('map', 'mtthwgry.bcb9b827', { zoomControl: false })
  .setView([37.771167, -122.402504], 12);

  var featureLayer = L.mapbox.featureLayer().loadURL('/all_locations');
  var userColors = {};

  featureLayer.on('ready', function(f) {
    // Don't display markers until a user filter has been clicked
    this.setFilter(function() {
      return false;
    });

    // Generate user:color key/value pairs
    var geoJSON = this.getGeoJSON();
    geoJSON.forEach(function(obj) {
      var userId = obj.properties.user_id;
      userColors[userId] = userColors[userId] || randomColor();
      obj.properties['marker-color'] = userColors[userId];
    });

    this.addTo(map);
  });

  // This will keep track of which users filters have been clicked
  var usersOn = [];

  $('.user-list').on("click", '.user-list-item a', function(event) {
    event.preventDefault();

    var userId = $(this).data('user-id');
    var index = usersOn.indexOf(userId);
    var $userListItem = $(this).closest('.user-list-item');
    $userListItem.toggleClass('active');

    // Set the background color according to the user's filter status
    if(index > -1) {
      $userListItem.css("background-color", "");
      usersOn.splice(index, 1);
    } else {
      $userListItem.css("background-color", userColors[userId]);
      usersOn.push(userId);
    }

    // Now filter the markers
    featureLayer.setFilter(function(f) {
      return usersOn.indexOf(f.properties.user_id) > -1;
    });

    // If the map is zoomed out and only one user is being filtered, re-zoom the map
    if(map.getZoom() < 8) {
      map.fitBounds(featureLayer.getBounds());
    }
  });
});