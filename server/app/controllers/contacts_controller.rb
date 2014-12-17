class ContactsController < ApplicationController
    def create
		@contact = Contact.new(@contact_params);
		if @contact.save
			respond_to do |format|
				format.json { render json: @contact.as_json, status: 201 }
				# format.json { render json: @customers, status: 201, location: @customers }
			end
		else
			respond_to do |format|
				format.json { render json: @contact.errors.as_json, status: 422 }
			end
		end
	end

	private

	def contact_params
   	params.require(:contact).permit(:name)
  	end
end