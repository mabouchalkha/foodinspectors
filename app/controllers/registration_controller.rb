class RegistrationController < Devise::RegistrationsController
    respond_to :json
    
    def create
        user = User.new(user_params)
        user.roles = if params[:user][:admin] == true then [:admin] else [:user] end
        
        if user.save
            sign_in(user)
            render :status => 200,
               :json => { :success => true, :info => "Account created", :data => user }
        else
            warden.custom_failure!
            render :status => 422,
               :json => { :success => true, :info => user.errors}
       end
    end
    
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
