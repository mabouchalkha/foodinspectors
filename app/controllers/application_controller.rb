class ApplicationController < ActionController::Base
  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng
  rescue_from CanCan::AccessDenied, :with => :rescue_cancan
  #rescue_from StandardError, :with => :render_error
  
  def permission_denied
    render :file => "public/401.html", :status => :unauthorized
  end
  
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
  
  def rescue_cancan(ex)
     render :status => 403,
               :json => { :success => false, :info => "Access denied", :data => ex }
  end
  
  def render_error(ex)
      render :status => 500,
               :json => { :success => false, :info => "Server error", :data => ex }
  end
     
  protected
    def verified_request?
        super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
    end
        
end
