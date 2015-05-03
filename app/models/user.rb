class User < ActiveRecord::Base
  has_many :locations
  has_many :transactions
  has_many :charges
  has_many :earnings

  validates :name, presence: true, uniqueness: true
end
