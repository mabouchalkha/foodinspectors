class AddTitleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :title, :string
    add_column :users, :is_enabled, :boolean, :default => false
  end
end
