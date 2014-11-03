class UserController < ApplicationController
    before_action :authenticate_user!
    authorize_resource :class => false
    respond_to :json
    
    def index
        predicate = params[:predicate] || 'email'
        reverse = params[:reverse] != nil ? params[:reverse] == 'true' ? 'DESC' : 'ASC' : 'ASC'
        offset = params[:page] || 0
        order = predicate + ' ' + reverse
        search = params[:searchValue]
        
        if !search.blank?
            search = '%%' + search + '%%'
            users = User.all(:order => order, :limit => 20, :offset => offset, :conditions => ['email like ? or first_name like ? or last_name like ?', search, search, search])
            count = users.count
        else
            users = User.all(:order => order, :limit => 20, :offset => offset)
            count = User.count
        end
        
        render FormatResponse.success(nil, users, { :count => count })
    end
    
    def read
        id = params[:id]
        
        user = User.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
        render FormatResponse.success(nil, users, { :is_new => false })
    end
    
    def get_new
        render FormatResponse.success(nil, User.new, { :is_new => true })
    end
    
    def update
        id = params[:id]
        
        if id.blank?
            raise "Email already registered" unless User.exists?(:email => params[:user][:email]).nil?

            user = User.new(user_params_create)
            user.password = Devise.friendly_token.first(8)
            
            if user.save!
                GenericMailer.welcome_email(user).deliver
                render FormatResponse.success("Account created", nil)
            else
                #warden.custom_failure!
                render FormatResponse.error(500, "internal error", user.errors.full_message)
            end
        else
            user = User.find(id)
            user.update!(user_params_update)
            render FormatResponse.success("Account updated", nil)
        end
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
        def user_exist(email)
            User.exists?(:email => email)
        end
    
        def user_params_update
            params.require(:user).permit(:user_name, :email, :first_name, :last_name, :title, :is_enabled, :roles_mask)
        end
        
        def user_params_create
            params.require(:user).permit(:user_name, :email, :first_name, :last_name, :title, :is_enabled, :roles_mask)
        end
end