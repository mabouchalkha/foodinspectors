class ContactsController < ApplicationController
    def create
		@contact = Contact.new(@contact_params);
		if @contact.save!
			render status: :ok, json: @contact.as_json
	end

	private

	def contact_params
   	params.require(:contact).permit(:name)
  	end
end