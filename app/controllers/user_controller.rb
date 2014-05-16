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
end