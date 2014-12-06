class CreateUserConfigs < ActiveRecord::Migration
  def change
        create_table :user_configs do |t|
            t.integer :index_qty, null: false
            t.integer :user_id, null: false
            t.timestamps
        end
    end
end
