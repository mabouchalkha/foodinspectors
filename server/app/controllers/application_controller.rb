class ApplicationController < ActionController::Base
   # Prevent CSRF attacks by raising an exception.
   # For APIs, you may want to use :null_session instead.
   # http://stackoverflow.com/questions/19772852/sending-an-angular-post-request-with-parameter-to-rails-api
    protect_from_forgery with: :null_session

before_filter :set_headers

def index
  puts "Do nothing."
  render nothing: true
end
            

   before_filter :cors_preflight_check
   after_filter :set_cors_headers, :set_csrf_cookie_for_ng

   # before_filter :set_cors_headers
   # before_filter :cors_preflight

   def ping
      render status: 200,
         json: {
            success: "true"
         }
   end

   def set_cors_headers
      headers['Access-Control-Allow-Origin'] = AppConfig.client['origin']
      headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      # headers['Access-Control-Allow-Headers'] = '*'
      headers['Access-Control-Max-Age'] = "3628800"
   end

    def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end

   def cors_preflight
      head(:ok) if request.method == :options
   end

   def authenticate_cors_user
      if request.xhr? and !user_signed_in?
         render status: 401,
            json: {
             error: "You are not authenticated to run this action"
            }
      end
   end

     def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

protected

  def verified_request?
    super || form_authenticity_token == request.headers['X_XSRF_TOKEN']
  end  
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
         render :file => "public/401.html", :status => :unauthorized, :layout => false
      end

      def not_found
         raise ActionController::RoutingError.new('Not Found')
      end
end
