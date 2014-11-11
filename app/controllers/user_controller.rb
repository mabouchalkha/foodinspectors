class UserController < ApplicationController
    before_action :authenticate_user!
    authorize_resource :class => false
    respond_to :json
    
    def index
        search = GenericIndex.generate_search_string params[:reverse]
        conditions = ['email like ? or first_name like ? or last_name like ?', search, search, search]
        indexData = GenericIndex.retrieve_index User, params[:predicate], params[:reverse], params[:page], params[:searchValue], conditions
        render FormatResponse.success(nil, indexData[:objects], { :count => indexData[:count] })
    end
    
    def read
        if params[:id].casecmp("new") == 0
            render FormatResponse.success(nil, nil, { is_new: true})
        else
            user = User.where(:id => params[:id]).first || raise(ActiveRecord::RecordNotFound)
            render FormatResponse.success nil, user, { :is_new => false }
        end
    end
    
    def update
        user = User.find(params[:id]) 
        user.update! user_params_update
        render FormatResponse.success("Account updated", user.id)
    end
    
    def create
        raise "Email already registered" unless User.exists?(:email => params[:user][:email]).nil?

        user = User.new(user_params_create)
        user.password = Devise.friendly_token.first(8)
        
        user.save!
        GenericMailer.welcome_email(user).deliver
        render FormatResponse.success("Account created", user.id)
    end
    
    def delete
        id = params[:id]
        
        if !current_user.nil? && current_user.id.to_s != id.to_s
            user = User.find(id)
            if user.destroy!
                render FormatResponse.success("Account deleted", nil)
            else
                raise "Cannot remove the account"
            end
        else
            raise "Cannot remove your own account while connected"
        end
    end
    
    private
        def user_params_update
            params.require(:user).permit(:user_name, :email, :first_name, :last_name, :title, :is_enabled, :roles_mask)
        end
        
        def user_params_create
            params.require(:user).permit(:user_name, :email, :first_name, :last_name, :title, :is_enabled, :roles_mask)
        end
end