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
        
        render FormatResponse.success(nil, payementTerms, { :count => count })
    end
    
    def read
        id = params[:id]
        
        pt = PayementTerm.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
        render FormatResponse.success(nil, pt, { :is_new => false })
    end
    
    #def get_new
    #    render FormatResponse.success(nil, PayementTerm.new, { :is_new => true })
    #end
    
    def update
        id = params[:id]
        
        if id.blank?
            pt = PayementTerm.new(pt_params_update)

            if pt.save!
                render FormatResponse.success("Payement term created", nil)
            end
        else
            pt = PayementTerm.find(id)
            pt.update!(pt_params_update)
            render FormatResponse.success("Payement term updated", nil)
        end
    end
    
    def delete
        id = params[:id]
        
        pt = PayementTerm.find(id)
        if pt.destroy!
            render FormatResponse.success("PayementTerm deleted", nil)
        else
            raise "Cannot remove the payement term"
        end
    end
    
    private 
        def pt_params_update
            params.require(:payementTerm).permit(:name, :is_enabled, :due_in_days)
        end
end
