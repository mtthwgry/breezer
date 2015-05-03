class Location < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true

  def to_geojson
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [self.longitude, self.latitude]
      },
      properties: {
        id: self.id,
        user_id: self.user_id,
        name: self.user.name,
        'marker-color': '#' + ("%06x" % (rand * 0xffffff))
      }
    }
  end
end