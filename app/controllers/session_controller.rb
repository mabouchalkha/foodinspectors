class SessionController < Devise::SessionsController
    protect_from_forgery with: :null_session
    respond_to :json
    
    def create
        resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        render :status => 200,
               :json => { :success => true, :info => "Logged in", :data => current_user }
    end
    
    def destroy
        warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        sign_out
        render :status => 200,
               :json => { :success => true, :info => "Logged out" }
    end
    
    def failure
        respond_to do |format|
            format.html { super }
            format.json {
                warden.custom_failure!
                render :json => {:success => false, :errors => ["Login Failed"]}
            }
        end
    end
    
    def show_current_user
        warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        render :status => 200,
               :json => { :success => true, :info => "Current User", :data => current_user }
    end
end
