class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :user_id, index: true
      t.string :type, index: true
      t.decimal :amount, precision: 14, scale: 2

      t.timestamps null: false
    end
  end
end
