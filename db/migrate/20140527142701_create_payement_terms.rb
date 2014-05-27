class CreatePayementTerms < ActiveRecord::Migration
    def change
        create_table :payement_terms do |t|
            t.string :name, null: false
            t.integer :due_in_days, null: false
            t.boolean :is_enabled, default: true
            t.timestamps
        end
    end
end
