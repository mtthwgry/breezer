require 'rails_helper'

describe Location do
  describe "Validations" do
    let(:location) { Location.create }
    describe "user_id" do
      it "can't be blank" do
        expect(location.errors).to include(:user_id)
      end
    end

    describe "latitude" do
      it "can't be blank" do
        expect(location.errors).to include(:latitude)
      end
    end

    describe "longitude" do
      it "can't be blank" do
        expect(location.errors).to include(:longitude)
      end
    end
  end
end