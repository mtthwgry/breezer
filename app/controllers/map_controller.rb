class MapController < ApplicationController
  def index
    @users = User.order(name: :asc)
  end

  def all_locations
    geo_json = []

    @locations = Location.all
    @locations.each do |location|
      geo_json << GeoJsonPresenter.new(location).to_geojson
    end

    render json: geo_json
  end
end