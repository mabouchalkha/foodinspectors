class ApplicationController < ActionController::Base
   # Prevent CSRF attacks by raising an exception.
   # For APIs, you may want to use :null_session instead.
   # protect_from_forgery with: :null_session
   protect_from_forgery
   skip_before_action :verify_authenticity_token, if: :json_request?
   before_action :load_schema, :authenticate_user!
  
   protected

   def json_request?
      request.format.json?
   end
    
   private
   def load_schema
      Apartment::Database.switch('public')
      return unless request.subdomain.present?

      account = Account.where(subdomain: request.subdomain).first
      if account
        Apartment::Database.switch(account.subdomain)
      else
        permission_denied
      end
    end
    
   def authenticate_user_from_token! #Devise override
      user_id    = params[:auth_user_id].presence
      user       = user_id && User.find_by_id(user_id)

      if user && Devise.secure_compare(user.authentication_token, params[:auth_token])
         @current_user = user
      else
         return permission_denied
      end
   end

   def permission_denied #Devise override
      render   :json => {error: "Please enter a correct username and password"}, 
               :status => :unauthorized, 
               :layout => false
   end

   def not_found
      raise ActionController::RoutingError.new('Not Found')
   end
end
