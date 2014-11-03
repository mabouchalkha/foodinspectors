require 'spec_helper'
require 'faker'

describe StatusController do
    describe "GET #index" do
        context "Authorization test (CANCAN)" do
            it "it refuse not logged user (CANCAN TEST)" do
                request.env['warden'].stub(:authenticate!).and_throw(:warden, {:scope => :user})
                
                get :index, :format => :json
    
                expect(response).not_to be_success
                expect(response.status).to eq(401)
            end
            
            it "it refuse user not logged as admin (CANCAN TEST)" do
                user = FactoryGirl.build(:user)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                get :index, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(403)
            end
            
            it "it allow user logger as admin (CANCAN TEST)" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                get :index, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
            end 
        end
    end
end