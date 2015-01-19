Foodinspectors::Application.routes.draw do

   namespace :api, defaults: {format: 'json'} do
      namespace :v1 do

      end 
   end
   
   devise_for :users, 
      :controllers => {
         registrations: "users/registrations", 
         sessions: "users/sessions"
      }#, via: :options
      
   devise_scope :user do
      post '/check/is_user' => 'users/users#is_user', as: 'is_user'
      post '/current_user' => 'users/sessions#get_current_user'
   end

   get 'users', :to => 'users#index'
   
   resources :contacts

   get "foodinspectors/index"
   root "foodinspectors#index"
   match '*path' => "foodinspectors#index", :via => [:get, :post]
end
