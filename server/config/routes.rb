class SubdomainPresent
  def self.matches?(request)
    request.subdomain.present?
  end
end

class SubdomainBlank
  def self.matches?(request)
    request.subdomain.blank?
  end
end

Foodinspectors::Application.routes.draw do
   namespace :api, defaults: {format: 'json'} do
      namespace :v1 do

      end 
   end
   constraints(SubdomainPresent) do
     devise_for :users, 
        :controllers => {
           registrations: "users/registrations", 
           sessions: "users/sessions"
        }#, via: :options
   end
      
    constraints(SubdomainBlank) do
      resources :accounts, only: [:new, :create]
      root "foodinspectors#index"
    end
  
   devise_scope :user do
      post '/check/is_user' => 'users/users#is_user', as: 'is_user'
      post '/current_user' => 'users/sessions#get_current_user'
   end

   get 'users', :to => 'users#index'
   
   scope '(:locale)' do
      resources :contacts
   end


   get "foodinspectors/index"
   root "foodinspectors#index"
   match '*path' => "foodinspectors#index", :via => [:get, :post]
end
