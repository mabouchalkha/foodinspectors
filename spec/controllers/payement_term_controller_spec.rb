require 'spec_helper'
require 'faker'

describe PayementTermController do
    describe "GET #index" do
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
        
        it "it show all payement terms" do
            user = FactoryGirl.build(:admin)
            request.env['warden'].stub :authenticate! => user
            controller.stub :current_user => user
            
            (1..45).each do |n|
                FactoryGirl.create(:payement_term, :name => Faker::Lorem.words(1).join() + '_' + n.to_s) 
            end
            
            get :index, :format => :json

            expect(response).to be_success
            expect(JSON.parse(response.body)['meta']['count']).to eq(45)
        end
        
        it "it return only the first 20 (paging)" do
            user = FactoryGirl.build(:admin)
            request.env['warden'].stub :authenticate! => user
            controller.stub :current_user => user
            
            (1..45).each do |n|
                FactoryGirl.create(:payement_term, :name => Faker::Lorem.words(1).join() + '_' + n.to_s) 
            end
            
            get :index, :format => :json

            expect(response).to be_success
            expect(JSON.parse(response.body)['data'].count).to eq(20)
        end
        
        it "it filter data when searchValue is provided" do
            user = FactoryGirl.build(:admin)
            request.env['warden'].stub :authenticate! => user
            controller.stub :current_user => user
            
            (1..44).each do |n|
                FactoryGirl.create(:payement_term, :name => Faker::Lorem.words(1).join() + '_' + n.to_s) 
            end
            
            FactoryGirl.create(:payement_term, :name => 'special payement term') 
            
            get :index, :searchValue => 'special payement term', :format => :json

            expect(response).to be_success
            expect(JSON.parse(response.body)['data'].count).to eq(1)
        end
    end
end