module GenericIndex
    def self.retrieve_index model, predicate, reverse, offset, search, conditions
        raise "You need to specify a model to generate a generic index" unless !model.nil?
        predicate = predicate || 'name'
        reverse = !reverse.nil? ? reverse == 'true' ? 'DESC' : 'ASC' : 'ASC'
        offset = offset || 0
        order = predicate + ' ' + reverse
        
        if !search.blank?
            objects = model.where(conditions).order(order).limit(20).offset(offset)
            count = objects.count(:conditions => conditions)
        else
            objects = model.order(order).limit(20).offset(offset)
            count = model.count
        end
        
        {:objects => objects, :count => count}
    end
    
    def self.generate_search_string search
       if !search.blank?
           '%' + search + '%'
       else
          nil 
       end
    end
end