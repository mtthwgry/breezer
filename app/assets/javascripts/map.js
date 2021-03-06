$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoibXR0aHdncnkiLCJhIjoibW82OTJicyJ9.ykVo84aS5xtK3jPy_iX6Sg';

  var map = L.mapbox.map('map', 'mtthwgry.bcb9b827', { zoomControl: false }).setView([37.771167, -122.402504], 12);

  var featureLayer = L.mapbox.featureLayer().loadURL('/all_locations'),
      userColors = {};

  featureLayer.on('ready', function(e) {
    // Don't display markers until a user filter has been clicked
    this.setFilter(function() {
      return false;
    });

    // Generate user:color key/value pairs
    var geoJSON = this.getGeoJSON();

    geoJSON.forEach(function(obj) {
      var userId = obj.properties.user_id,
          transactionType = obj.properties.transaction.type;

      userColors[userId] = userColors[userId] || randomColor({hue: 'orange', luminosity: 'dark'});
      obj.properties['marker-color'] = userColors[userId];


      if (transactionType === 'Charge') {
        obj.properties['marker-color'] = '#e31c1c'
        obj.properties['marker-symbol'] = 'bank';
      } else if (transactionType === 'Earning') {
        obj.properties['marker-color'] = '#07db43'
        obj.properties['marker-symbol'] = 'bank';
      }
    });

    this.addTo(map);
  });

  // Add popups to markers
  featureLayer.on('layeradd', function(e) {
    var layer = e.layer,
        properties = layer.feature.properties,
        transaction = properties.transaction;

    var content = '<p>' + properties.name + ' | ' + properties.created_at + '</p>';

    if (transaction.type == 'Charge') {
      content = content + '<p class="charge">−' + transaction.amount + '</p>';
    } else if (transaction.type == 'Earning') {
      content = content + '<p class="earning">+' + transaction.amount + '</p>';
    }

    layer.bindPopup(content);
  });

  // This will keep track of which users filters have been clicked
  var usersOn = [],
      filterCharges = false,
      filterEarnings = false,
      filterOther = false;

  $('.filters input[type="checkbox"]').click(function() {
    var $li = $(this).closest('li'),
        id = $(this).attr('id');

    if ($(this).attr('id') === 'charges-filter') {
      $li.toggleClass('charge');
    } else if ($(this).attr('id') === 'earnings-filter') {
      $li.toggleClass('earning');
    }

    // Updates the filter flag
    if (id === 'charges-filter') {
      filterCharges = !filterCharges;
    } else if(id === 'earnings-filter') {
      filterEarnings = !filterEarnings;
    } else if(id === 'other-filter') {
      filterOther = !filterOther;
    }

    filterMarkers();
  });

  $('.user-list').on('click', '.user-list-item a', function(event) {
    event.preventDefault();

    var userId = $(this).data('user-id');
    var index = usersOn.indexOf(userId);
    var $userListItem = $(this).closest('.user-list-item');
    $userListItem.toggleClass('active');

    // Set the background color according to the user's filter status
    if (index > -1) {
      $userListItem.css('background-color', '');
      usersOn.splice(index, 1);
    } else {
      $userListItem.css('background-color', userColors[userId]);
      usersOn.push(userId);
    }

    // Now filter the markers
    filterMarkers();

    // If the map is zoomed out and only one user is being filtered, re-zoom the map
    if (map.getZoom() < 8) {
      map.fitBounds(featureLayer.getBounds());
    }
  });

  $('#deselect').click(function(e) {
    e.preventDefault();

    usersOn = [];
    $('.user-list-item').css('background-color', '').removeClass('active');

    filterMarkers();
  })

  var filterMarkers = function() {
    featureLayer.setFilter(function(f) {
      return filter(f)
    });
  }

  var filter = function(marker) {
    // When filtering both charges and earnings
    if (filterCharges && filterEarnings) {
      return filterByUser(marker) && (filterByCharges(marker) || filterByEarnings(marker));
    }

    // When filtering either charges or earnings
    return filterByUser(marker) && filterByCharges(marker) && filterByEarnings(marker);
  }

  var filterByUser = function(marker) {
    return usersOn.indexOf(marker.properties.user_id) > -1;
  }

  var filterByCharges = function(marker) {
    var charge = true;
    if (filterCharges) {
      charge = marker.properties.transaction.type === 'Charge';
    }
    return charge;
  }

  var filterByEarnings = function(marker) {
    var earning = true;
    if (filterEarnings) {
      earning = marker.properties.transaction.type === 'Earning';
    }
    return earning;
  }
});