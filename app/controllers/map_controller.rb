class MapController < ApplicationController
  def index
    @users = User.order(name: :asc)
    render :text => "", :layout => true
  end

  def all_locations_for_user
    @locations = Location.where(user_id: params[:id])
    render json: @locations.map(&:to_geojson)
  end

  def all_locations
    @locations = Location.all
    render json: @locations.map(&:to_geojson)
  end
end