class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :set_cors_headers
  before_filter :cors_preflight

  def ping
    render status: 200,
        json: {
          success: "true"
        }
  end

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = AppConfig.client['origin']
    headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    headers['Access-Control-Allow-Headers'] = '*'
    headers['Access-Control-Max-Age'] = "3628800"
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

end