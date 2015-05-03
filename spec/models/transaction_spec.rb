require 'rails_helper'

describe Transaction do
  describe "Validations" do
    describe "type" do
      it { should validate_presence_of :type }
      it { should validate_inclusion_of(:type).in_array(Transaction.types) }
    end

    describe "user_id" do
      it { should validate_presence_of :user_id }
    end

    describe "amount" do
      it { should validate_presence_of :amount }
    end
  end

  describe ".types" do
    let(:types) { Transaction.types }
    it "includes Charge" do
      expect(types).to include("Charge")
    end

    it "includes Earning" do
      expect(types).to include("Earning")
    end
  end
end