class CreateBasketItems < ActiveRecord::Migration
  def change
    create_table :basket_items do |t|
      t.references :basket, index: true, foreign_key: true
      t.references :item, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
