require 'rails_helper'

describe User do
  describe "Validations" do
    let(:user) { User.create }
    it "requires a name" do
      expect(user.errors).to include(:name)
    end
  end
end