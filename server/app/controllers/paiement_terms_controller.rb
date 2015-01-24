class PaiementTermsController < ApplicationController  
  def index
    render FormatResponse.success 'index', PaiementTerm.all, { :is_new => false }
  end
  
  def show
    render FormatResponse.success 'show', PaiementTerm.find params.id, { :is_new => false }
  end
end