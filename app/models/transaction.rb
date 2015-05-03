class Transaction < ActiveRecord::Base
  def self.types
    %w( Charge Earning ).freeze
  end

  validates :user_id, presence: true
  validates :amount, presence: true
  validates :type, presence: true, inclusion: { in: Transaction.types,
    message: "%{value} is not a valid transaction type" }

end
