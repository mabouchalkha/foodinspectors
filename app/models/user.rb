require 'role_model'

class User < ActiveRecord::Base
    include RoleModel
    
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :omniauthable
    has_many :authorizations, :dependent => :destroy

    roles_attribute :roles_mask
    
    roles :admin, :user
    
    has_paper_trail
end
