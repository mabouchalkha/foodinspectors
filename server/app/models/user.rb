class User < ActiveRecord::Base
   # Include devise modules
   devise :database_authenticatable, :registerable,
   :recoverable, :rememberable, :trackable,
   :validatable
  
  validates :name, presence: true
  
   has_paper_trail
   
   before_save :ensure_authentication_token
 
   def ensure_authentication_token
      if authentication_token.blank?
         self.authentication_token = generate_authentication_token
      end
   end

   def clear_authentication_token
      self.authentication_token = nil
      self.save
   end
 
   private
  
   def generate_authentication_token
      loop do
         token = Devise.friendly_token
         break token unless User.where(authentication_token: token).first
      end
   end
end
