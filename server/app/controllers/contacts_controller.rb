class ContactsController < ApplicationController
    def index
        render FormatResponse.success(nil, Product.first, Product.first. hydra_attributes) 
    end
    
    def create
		@contact = Contact.new(@contact_params);
		if @contact.save!
			render status: :ok, json: @contact.as_json
        end
	end

	private

	def contact_params
   	params.require(:contact).permit(:name)
  	end
end