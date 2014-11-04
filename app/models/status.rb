class Status < ActiveRecord::Base
    belongs_to :entity
    validates :name, presence: true
    validates :display_id, presence: true, uniqueness: true
    validates :entity_id, presence: true
    
    has_paper_trail
end
