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
            users = User.all(:order => order, :limit => 2, :offset => offset, :conditions => ['email like ? or first_name like ? or last_name like ?', search, search, search])
            count = users.count
        else
            users = User.all(:order => order, :limit => 2, :offset => offset)
            count = User.count
        end
        
        render :status => 200,
               :json => { :success => true, :info => "", :data => users, :meta => { :count => count } }
    end
    
    def read
        id = params[:id]
        
        raise "Cannot retrieve user without an ID. Please provide one." unless !id.blank?
        
        if id.to_i == -1
            render :status => 200,
                   :json => { :success => true, :info => "", :data => User.new, :meta => { }}
        else
            user = User.where(:id => id).first
            
            raise "Cannot retrieve user with ID " + id unless !user.nil?
            
            render :status => 200,
                   :json => { :success => true, :info => "", :data => user, :meta => { }}
       end
    end
    
    def update
        id = params[:id]
        
        if id.blank?
            user = User.new(user_params_create)
            
            if user.save
                render :status => 200,
                       :json => { :success => true, :info => "Account created", :data => { } }
            else
                warden.custom_failure!
                render :status => 422,
                       :json => { :success => true, :info => user.errors}
            end
        else
            User.update(params[:id], user_params_update)
            render :status => 200,
                   :json => { :success => true, :info => { }, :data => { }, :meta => { }}
        end
    end
    
    def delete
        
    end
    
    private
        def user_params_update
            params.require(:user).permit(:user_name, :email, :first_name, :last_name, :title, :is_enabled, :roles_mask)
        end
        
        def user_params_create
            params.require(:user).permit(:user_name, :email, :first_name, :last_name, :title, :is_enabled, :roles_mask, :password)
        end
end