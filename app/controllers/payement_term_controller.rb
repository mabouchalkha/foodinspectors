class PayementTermController < ApplicationController
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
            payementTerms = PayementTerm.all(:order => order, :limit => 20, :offset => offset, :conditions => ['name like ?', search])
            count = payementTerms.count
        else
            payementTerms = PayementTerm.all(:order => order, :limit => 20, :offset => offset)
            count = PayementTerm.count
        end
        
        render :status => 200, :json => { :success => true, :info => "", :data => payementTerms, :meta => { :count => count } }
    end
    
    def read
        id = params[:id]
        
        pt = PayementTerm.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
        render :status => 200, :json => { :success => true, :info => "", :data => pt, :meta => { :is_new => false }}
    end
    
    def get_new
        render :status => 200, :json => { :success => true, :info => "", :data => PayementTerm.new, :meta => { :is_new => true }}
    end
    
    def update
        id = params[:id]
        
        if id.blank?
            pt = PayementTerm.new(pt_params_update)

            if pt.save!
                render :status => 200, :json => { :success => true, :info => "Payement term created", :data => { } }
            end
        else
            pt = PayementTerm.find(id)
            pt.update!(pt_params_update)
            render :status => 200, :json => { :success => true, :info => "Payement term updated", :data => { }, :meta => { }}
        end
    end
    
    def delete
        id = params[:id]
        
        pt = PayementTerm.find(id)
        if pt.destroy!
            render :status => 200, :json => { :success => true, :info => "PayementTerm deleted", :data => { }, :meta => { }}
        else
            raise "Cannot remove the payement term"
        end
    end
    
    private 
        def pt_params_update
            params.require(:payementTerm).permit(:name, :is_enabled, :due_in_days)
        end
end
