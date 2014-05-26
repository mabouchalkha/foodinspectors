class SessionController < Devise::SessionsController
    protect_from_forgery with: :null_session
    respond_to :json
    
    def create
        resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        render :status => 200, :json => { :success => true, :info => "Logged in", :data => current_user }
    end
    
    def destroy
        warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        sign_out
        render :status => 200, :json => { :success => true, :info => "Logged out" }
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
    
    def reset_password
       email = params[:email]
       
       raise "You need to specify your email to reset your password" unless !email.blank?
       
       user = User.where(:email => email).first
       
       if !user.nil?
          password = Devise.friendly_token.first(8)
          user.password = password;
          if user.save!
              GenericMailer.retrieve_password(user).deliver
              render :status => 200, :json => { :success => true, :info => "Password reseted", :data => { }, :meta => { }}
          end
       else
           raise "Cannot retrieve user with email "+ email
       end
       
       
    end
    
    def show_current_user
        warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        render :status => 200, :json => { :success => true, :info => "Current User", :data => current_user }
    end
    
    def new
        user = User.new(user_params)
        user.roles = if params[:user][:admin] == true then [:admin] else [:user] end
        
        if user.save
            sign_in(user)
            render :status => 200, :json => { :success => true, :info => "Account created", :data => user }
        else
            warden.custom_failure!
            render :status => 422, :json => { :success => true, :info => user.errors}
       end
    end
    
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
