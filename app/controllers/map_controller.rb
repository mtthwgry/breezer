class MapController < ApplicationController
  def index
    @users = User.order(name: :asc)
    render :text => "", :layout => true
  end
end