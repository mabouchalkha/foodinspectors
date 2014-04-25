PlaygroundOnrails::Application.routes.draw do
    devise_for :users

    devise_scope :user do
        post 'login' => 'session#create', :as => 'login'
        delete 'logout' => 'session#destroy', :as => 'logout'
        get 'current_user' => 'session#show_current_user', :as => 'show_current_user'
    end
    
    get '/private', to: 'private#index'
    
    get '/admin', to: 'admin#index'
    
    root to: "homes#index"
end
