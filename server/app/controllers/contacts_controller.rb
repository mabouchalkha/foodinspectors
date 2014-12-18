class ContactsController < ApplicationController
    def create
		@contact = Contact.new(@contact_params);
		if @contact.save
			render status: :ok, json: @contact.as_json
		else
			render status: :unprocessable_entity, json: @contact.errors.as_json
		end
	end

	private

	def contact_params
   	params.require(:contact).permit(:name)
  	end
end