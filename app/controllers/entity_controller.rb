class EntityController < ApplicationController
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
            entity = Entity.all(:order => order, :limit => 20, :offset => offset, :conditions => ['name like ?', search])
            count = entity.count
        else
            entity = Entity.all(:order => order, :limit => 20, :offset => offset)
            count = Entity.count
        end
        
        render FormatResponse.success(nil, entity, { :count => count })
    end
    
    def read
        id = params[:id]
        
        entity = Entity.where(:id => id).first || raise(ActiveRecord::RecordNotFound)
        render FormatResponse.success(nil, entity, { :is_new => false })
    end
    
    def get_new
        render FormatResponse.success(nil, Entity.new, { :is_new => true })
    end
    
    def update
        id = params[:id]
        
        if id.blank?
            entity = Entity.new(entity_params_update)

            if entity.save!
                render FormatResponse.success("Entity created", nil)
            end
        else
            entity = Entity.find(id)
            entity.update!(entity_params_update)
            render FormatResponse.success("Entity updated", nil)
        end
    end
    
    def delete
        id = params[:id]
        
        entity = Entity.find(id)
        if entity.destroy!
            render FormatResponse.success("Entity deleted", nil)
        else
            raise "Cannot remove the entity"
        end
    end
    
    private 
        def entity_params_update
            params.require(:entity).permit(:name)
        end
end
