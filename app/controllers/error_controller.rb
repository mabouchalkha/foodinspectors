class ErrorController < ApplicationController
    respond_to :json
    
    def create
        raise params[:ex]
        Airbrake.notify(new Exception(params[:ex]))
        render :status => 200,
               :json => { :success => true, :info => "Error logged" }
    end
end
