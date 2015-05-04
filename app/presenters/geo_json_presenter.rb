class GeoJsonPresenter
  include ActionView::Helpers::NumberHelper

  attr_reader :user, :location

  def initialize(location)
    @user = location.user
    @location = location
  end

  def transaction
    @transaction ||= user.transactions.where(created_at: location.created_at).limit(1)[0]
  end

  def to_geojson
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      },
      properties: {
        created_at: location.created_at.strftime("%m-%d-%y"),
        user_id: user.id,
        name: user.name,
        transaction: transaction_json || {}
      }
    }
  end

  def transaction_json
    if transaction
      {
        type: transaction.type,
        amount: number_to_currency(transaction.amount.to_f)
      }
    end
  end
end