class CreateStatuses < ActiveRecord::Migration
  def change
    create_table :statuses do |t|
      t.string :name, null: false
      t.string :display_id, null: false
      t.integer :entity_id, null: false

      t.timestamps
    end
  end
end
