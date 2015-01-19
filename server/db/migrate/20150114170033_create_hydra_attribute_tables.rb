class CreateHydraAttributeTables < ActiveRecord::Migration
  def up
      create_hydra_entity :paiement_terms do |t|
        t.string :name, null: false
        t.integer :due_in_days, null: false
        t.boolean :is_enabled, default: true
        t.timestamps
      end
  end

  def down
    drop_hydra_entity :paiement_terms
  end
end