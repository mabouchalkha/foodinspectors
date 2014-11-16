PlaygroundOnrails::Application.routes.draw do
  resources :payement_terms

    devise_for :users

    devise_scope :user do
        post 'login' => 'session#create', :as => 'login'
        delete 'logout' => 'session#destroy', :as => 'logout'
        get 'current_user' => 'session#show_current_user', :as => 'show_current_user'
        post 'register', to: 'session#new', :as => 'register'
        post '/user/resetPassword', to: 'session#reset_password'
    end
    
    # USER ROUTES -----------------------------------------------------------------
    get '/user', to: 'user#index'
    get '/user/:id', to: 'user#read'
    put '/user/', to: 'user#update'
    post '/user/', to: 'user#create'
    delete '/user/:id', to: 'user#delete'
    
    # PAYEMENT_TERM ROUTES -------------------------------------------------------
    get '/payementTerm', to: 'payement_term#index'
    get '/payementTerm/:id', to: 'payement_term#read'
    put '/payementTerm/', to: 'payement_term#update'
    post '/payementTerm/', to: 'payement_term#create'
    delete '/payementTerm/:id', to: 'payement_term#delete'
    
    post '/error', to: 'error#create'

    # needs to be the very last route
    # match '*path' => "homes#index", :via => [:get, :post]

    root to: "homes#index"
end
