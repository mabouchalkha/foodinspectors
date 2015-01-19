class ApplicationController < ActionController::Base
   # Prevent CSRF attacks by raising an exception.
   # For APIs, you may want to use :null_session instead.
   # protect_from_forgery with: :null_session
   protect_from_forgery
   skip_before_action :verify_authenticity_token, if: :json_request?

   after_action :set_csrf_cookie_for_ng
   

   def set_csrf_cookie_for_ng
      cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
   end

   protected

   def json_request?
      request.format.json?
   end

   def verified_request?
      super || form_authenticity_token == request.headers['X_XSRF_TOKEN']
   end  
    


   private
   def authenticate_user_from_token!
      user_id    = params[:auth_user_id].presence
      user       = user_id && User.find_by_id(user_id)

      # Notice how we use Devise.secure_compare to compare the token
      # in the database with the token given in the params, mitigating
      # timing attacks.
      if user && Devise.secure_compare(user.authentication_token, params[:auth_token])
         @current_user = user
      else
         return permission_denied
      end
   end

   def permission_denied
      render   :json => {error: "Please enter a correct username and password"}, 
               :status => :unauthorized, 
               :layout => false
   end

   def not_found
      raise ActionController::RoutingError.new('Not Found')
   end
end
