require 'rails_helper'

describe Location do
  describe "Validations" do
    describe "user_id" do
      it { should validate_presence_of :user_id }
    end

    describe "latitude" do
      it { should validate_presence_of :latitude }
    end

    describe "longitude" do
      it { should validate_presence_of :longitude }
    end
  end

  describe "Associations" do
    it { should belong_to :user }
  end

  describe '#to_geojson' do
    xit "formats the object as valid GeoJSON"
  end
end