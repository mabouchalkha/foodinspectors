class DropEntityAndStatusTable < ActiveRecord::Migration
  def change
      drop_table :entities
      drop_table :statuses
  end
end
