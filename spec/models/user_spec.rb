require 'rails_helper'

describe User do
  describe "Validations" do
    let(:user) { User.create }
    describe "name" do
      it "can't be blank" do
        expect(user.errors).to include(:name)
      end

      it "must be unique" do
        user.name = "Matthew"
        user.save
        user2 = User.create(name: "Matthew")
        expect(user2.errors).to include(:name)
      end
    end
  end
end