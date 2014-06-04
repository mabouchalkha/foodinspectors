class CreateEntities < ActiveRecord::Migration
  def change
    create_table :entities do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
