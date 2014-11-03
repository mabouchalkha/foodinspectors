class StatusController < ApplicationController
    before_action :authenticate_user!
    authorize_resource :class => false
    respond_to :json
    
    def index
        predicate = params[:predicate] || 'name'
        reverse = params[:reverse] != nil ? params[:reverse] == 'true' ? 'DESC' : 'ASC' : 'ASC'
        offset = params[:page] || 0
        order = predicate + ' ' + reverse
        search = params[:searchValue]
        
        if !search.blank?
            search = '%%' + search + '%%'
            status = Status.all(:order => order, :limit => 20, :offset => offset, :conditions => ['name like ?', search])
            count = status.count
        else
            status = Status.all(:order => order, :limit => 20, :offset => offset)
            count = Status.count
        end
        
        render :status => 200, :json => { :success => true, :info => "", :data => entity, :meta => { :count => count } }
    end
    
    def read
        id = params[:id]
        
        status = Status.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
        render :status => 200, :json => { :success => true, :info => "", :data => status, :meta => { :is_new => false }}
    end
    
    def get_new
        render :status => 200, :json => { :success => true, :info => "", :data => Status.new, :meta => { :is_new => true }}
    end
    
    def update
        id = params[:id]
        
        if id.blank?
            status = Status.new(status_params_update)

            if entity.save!
                render :status => 200, :json => { :success => true, :info => "Status created", :data => { } }
            end
        else
            status = Status.find(id)
            status.update!(status_params_update)
            render :status => 200, :json => { :success => true, :info => "Status updated", :data => { }, :meta => { }}
        end
    end
    
    def delete
        id = params[:id]
        
        status = Status.find(id)
        if status.destroy!
            render :status => 200, :json => { :success => true, :info => "Status deleted", :data => { }, :meta => { }}
        else
            raise "Cannot remove the status"
        end
    end
    
    private 
        def status_params_update
            params.require(:status).permit(:name, :display_id, :entity_id)
        end
end
