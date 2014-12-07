class User < ActiveRecord::Base
	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


   # We’ll also want to make sure that the authentication_token 
   # actually generates when the user is saved, so we’ll add a 
   # before action that ensures token generation for us

   def ensure_authentication_token
		if authentication_token.blank?
			self.authentication_token = generate_authentication_token
		end
  	end




private

  	def generate_authentication_token
		loop do
			token = Devise.friendly_token
			break token unless User.where(authentication_token: token).first
		end
  	end
end
