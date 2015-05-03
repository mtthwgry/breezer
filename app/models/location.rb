class Location < ActiveRecord::Base
  validates :user_id, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
end
