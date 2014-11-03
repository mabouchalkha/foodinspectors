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
    get '/user/new', to: 'user#get_new'
    get '/user/:id', to: 'user#read'
    put '/user/', to: 'user#update'
    delete '/user/:id', to: 'user#delete'
    
    # PAYEMENT_TERM ROUTES -------------------------------------------------------
    get '/payementTerm', to: 'payement_term#index'
    get '/payementTerm/new', to: 'payement_term#get_new'
    get '/payementTerm/:id', to: 'payement_term#read'
    put '/payementTerm/', to: 'payement_term#update'
    delete '/payementTerm/:id', to: 'payement_term#delete'
    
    # ENTITY ROUTES -------------------------------------------------------
    get '/entity', to: 'entity#index'
    get '/entity/new', to: 'entity#get_new'
    get '/entity/:id', to: 'entity#read'
    put '/entity/', to: 'entity#update'
    delete '/entity/:id', to: 'entity#delete'
    
    # STATUS ROUTES -------------------------------------------------------
    get '/status', to: 'status#index'
    get '/status/new', to: 'status#get_new'
    get '/status/:id', to: 'status#read'
    put '/status/', to: 'status#update'
    delete '/status/:id', to: 'status#delete'
    
    post '/error', to: 'error#create'

    # needs to be the very last route
    # match '*path' => "homes#index", :via => [:get, :post]

    root to: "homes#index"
end
