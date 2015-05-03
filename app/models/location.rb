class Location < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true

  def to_geojson
    transaction = self.user.transactions.where(created_at: self.created_at)[0]
    transaction_json = if transaction
      {type: transaction.type, amount: transaction.amount.to_f}
    end

    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [self.longitude, self.latitude]
      },
      properties: {
        created_at: self.created_at,
        user_id: self.user_id,
        name: self.user.name,
        transaction: transaction_json || {}
      }
    }
  end
end