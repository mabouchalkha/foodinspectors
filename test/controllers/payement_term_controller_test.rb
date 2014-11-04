require "test_helper"

class PayementTermControllerTest < ActionController::TestCase
    test "should return an array of payementTerm" do
       get :index
       
       assert_response :success
    end
end