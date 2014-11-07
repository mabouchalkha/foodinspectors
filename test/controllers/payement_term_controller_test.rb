require 'test_helper'
include Devise::TestHelpers

class PayementTermControllerTest < ActionController::TestCase

  setup do
    #@request.headers['Accept'] = Mime::JSON
    #@request.headers['Content-Type'] = Mime::JSON.to_s

  end

  test "should post my action" do
    get :read, { :id => 1, :format => :json}
    puts response.body
    assert_response :success, "#{response.body.data}"
    body = JSON.parse(response.body)
    assert_equal "Some returned value", body["str"]
  end

end