$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoibXR0aHdncnkiLCJhIjoibW82OTJicyJ9.ykVo84aS5xtK3jPy_iX6Sg';

  var map = L.mapbox.map('map', 'mtthwgry.bcb9b827', { zoomControl: false })
  .setView([37.771167, -122.402504], 12);

  var featureLayer = L.mapbox.featureLayer().loadURL('/all_locations');

  featureLayer.on('ready', function() {
    this.setFilter(function() {
      return false;
    });

    this.addTo(map);
  });

  var usersOn = [];

  $('.user-list').on("click", '.user-list-item a', function(event) {
    event.preventDefault();

    var $userListItem = $(this).closest('.user-list-item');
    $userListItem.toggleClass('active');

    var userId = $(this).data('user-id');

    if($userListItem.hasClass('active')) {
      usersOn.push(userId);
    } else {
      var index = usersOn.indexOf(userId);
      usersOn.splice(index, 1);
    }

    featureLayer.setFilter(function(f) {
      return usersOn.indexOf(f.properties.user_id) > -1;
    });

    map.fitBounds(featureLayer.getBounds());
  });
});