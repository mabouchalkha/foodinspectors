require "pp"

class PayementTermControllerTest < ActionController::TestCase
    include Devise::TestHelpers
    
    test "should block if user not logged in" do
        get :index
        
        json = JSON.parse(@response.body, symbolize_names: true)
        assert_response 401
        assert_equal "false", json[:success]
    end
    
    test "should get index" do
        #@request.env["devise.mapping"] = Devise.mappings[:admin]
        sign_in User.first
        
        get :index
    
        json = JSON.parse(@response.body, symbolize_names: true)
        assert_response :success
        assert_equal true, json[:success]
    end
end