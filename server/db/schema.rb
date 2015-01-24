# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150114170033) do

  create_table "contacts", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hydra_attribute_sets", force: true do |t|
    t.integer  "hydra_attribute_id", null: false
    t.integer  "hydra_set_id",       null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_attribute_sets", ["hydra_attribute_id", "hydra_set_id"], name: "hydra_attribute_sets_idx", unique: true

  create_table "hydra_attributes", force: true do |t|
    t.string   "entity_type",   limit: 32,                 null: false
    t.string   "name",          limit: 32,                 null: false
    t.string   "backend_type",  limit: 16,                 null: false
    t.string   "default_value"
    t.boolean  "white_list",               default: false, null: false
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "hydra_attributes", ["entity_type", "name"], name: "hydra_attributes_idx", unique: true

  create_table "hydra_boolean_paiement_terms", force: true do |t|
    t.integer  "entity_id",          null: false
    t.integer  "hydra_attribute_id", null: false
    t.boolean  "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_boolean_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_boolean_paiement_terms_idx", unique: true

  create_table "hydra_datetime_paiement_terms", force: true do |t|
    t.integer  "entity_id",          null: false
    t.integer  "hydra_attribute_id", null: false
    t.datetime "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_datetime_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_datetime_paiement_terms_idx", unique: true

  create_table "hydra_decimal_paiement_terms", force: true do |t|
    t.integer  "entity_id",                                   null: false
    t.integer  "hydra_attribute_id",                          null: false
    t.decimal  "value",              precision: 10, scale: 4
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
  end

  add_index "hydra_decimal_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_decimal_paiement_terms_idx", unique: true

  create_table "hydra_float_paiement_terms", force: true do |t|
    t.integer  "entity_id",          null: false
    t.integer  "hydra_attribute_id", null: false
    t.float    "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_float_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_float_paiement_terms_idx", unique: true

  create_table "hydra_integer_paiement_terms", force: true do |t|
    t.integer  "entity_id",          null: false
    t.integer  "hydra_attribute_id", null: false
    t.integer  "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_integer_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_integer_paiement_terms_idx", unique: true

  create_table "hydra_sets", force: true do |t|
    t.string   "entity_type", limit: 32, null: false
    t.string   "name",        limit: 32, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "hydra_sets", ["entity_type", "name"], name: "hydra_sets_idx", unique: true

  create_table "hydra_string_paiement_terms", force: true do |t|
    t.integer  "entity_id",          null: false
    t.integer  "hydra_attribute_id", null: false
    t.string   "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_string_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_string_paiement_terms_idx", unique: true

  create_table "hydra_text_paiement_terms", force: true do |t|
    t.integer  "entity_id",          null: false
    t.integer  "hydra_attribute_id", null: false
    t.text     "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "hydra_text_paiement_terms", ["entity_id", "hydra_attribute_id"], name: "hydra_text_paiement_terms_idx", unique: true

  create_table "paiement_terms", force: true do |t|
    t.integer  "hydra_set_id"
    t.string   "name",                        null: false
    t.integer  "due_in_days",                 null: false
    t.boolean  "is_enabled",   default: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "paiement_terms", ["hydra_set_id"], name: "paiement_terms_hydra_set_id_idx"

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "authentication_token"
  end

  add_index "users", ["authentication_token"], name: "index_users_on_authentication_token", unique: true
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
