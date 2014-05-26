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
        
        render :status => 200,
               :json => { :success => true, :info => "", :data => users, :meta => { :count => count } }
    end
    
    def read
        id = params[:id]
        
        user = User.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
        render :status => 200,
               :json => { :success => true, :info => "", :data => user, :meta => { :is_new => false }}
    end
    
    def get_new
        render :status => 200,
               :json => { :success => true, :info => "", :data => User.new, :meta => { :is_new => true }}
    end
    
    def update
        id = params[:id]
        
        if id.blank?
            raise "Email already registered" unless User.exists?(:email => params[:user][:email]).nil?

            user = User.new(user_params_create)
            user.password = SecureRandom.hex(8)
            
            if user.save
                GenericMailer.welcome_email(user).deliver
                
                render :status => 200,
                       :json => { :success => true, :info => "Account created", :data => { } }
            else
                #warden.custom_failure!
                render :status => 500,
                       :json => { :success => false,  :info => "internal error", :data => user.errors.full_message}
            end
        else

            User.update(params[:id], user_params_update)
            render :status => 200,
                   :json => { :success => true, :info => "Account updated", :data => { }, :meta => { }}
        end
    end
    
    def delete
        id = params[:id]
        
        if !current_user.nil? && current_user.id.to_s != id.to_s
            if User.destroy(id)
                render :status => 200,
                       :json => { :success => true, :info => "Account deleted", :data => { }, :meta => { }}
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