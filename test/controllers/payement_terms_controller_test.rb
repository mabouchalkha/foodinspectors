require 'test_helper'

class PayementTermsControllerTest < ActionController::TestCase
  setup do
    @payement_term = payement_terms(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:payement_terms)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create payement_term" do
    assert_difference('PayementTerm.count') do
      post :create, payement_term: {  }
    end

    assert_redirected_to payement_term_path(assigns(:payement_term))
  end

  test "should show payement_term" do
    get :show, id: @payement_term
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @payement_term
    assert_response :success
  end

  test "should update payement_term" do
    patch :update, id: @payement_term, payement_term: {  }
    assert_redirected_to payement_term_path(assigns(:payement_term))
  end

  test "should destroy payement_term" do
    assert_difference('PayementTerm.count', -1) do
      delete :destroy, id: @payement_term
    end

    assert_redirected_to payement_terms_path
  end
end
