class PayementTermController < ApplicationController
    before_action :authenticate_user!
    authorize_resource :class => false
    respond_to :json
    
    def index
        search = GenericIndex.generate_search_string params[:searchValue]
        conditions = ['name like ?', search]
        indexData = GenericIndex.retrieve_index PayementTerm, params[:predicate], params[:reverse], params[:page], params[:searchValue], conditions
        render FormatResponse.success(nil, indexData[:objects], { :count => indexData[:count] })
    end
    
    def read
        if params[:id].casecmp("new") == 0
            render FormatResponse.success(nil, nil, { is_new: true})
        else
            id = params[:id]
        
            pt = PayementTerm.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
            render FormatResponse.success nil, pt, { :is_new => false }
        end
    end
    
    def update
        pt = PayementTerm.find params[:id]
        pt.update! pt_params_update
        render FormatResponse.success "Payement term updated", pt.id
    end
    
    def create
        pt = PayementTerm.new pt_params_update
        savedPt = pt.save!
        render FormatResponse.success "Payement term created", pt.id
    end
    
    def delete
        pt = PayementTerm.find(params[:id])
        pt.destroy!
        render FormatResponse.success "PayementTerm deleted", nil
        
    end
    
    private 
        def pt_params_update
            params.require(:payementTerm).permit(:name, :is_enabled, :due_in_days)
        end
end
