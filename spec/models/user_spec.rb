require 'rails_helper'

describe User do
  describe "Validations" do
    describe "name" do
      it { should validate_presence_of :name }
      it { should validate_uniqueness_of :name }
    end
  end

  describe "Associations" do
    describe "locations" do
      it { should have_many(:locations) }
    end
  end
end