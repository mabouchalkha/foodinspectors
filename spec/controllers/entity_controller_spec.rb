require 'spec_helper'
require 'faker'

describe EntityController do
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
        context "Behavior test" do
            it "it show all entity" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                (1..45).each do |n|
                    FactoryGirl.create(:entity, :name => Faker::Lorem.words(1).join() + '_' + n.to_s) 
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
                    FactoryGirl.create(:entity, :name => Faker::Lorem.words(1).join() + '_' + n.to_s) 
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
                    FactoryGirl.create(:entity, :name => Faker::Lorem.words(1).join() + '_' + n.to_s) 
                end
                
                FactoryGirl.create(:entity, :name => 'special entity') 
                
                get :index, :searchValue => 'special entity', :format => :json
    
                expect(response).to be_success
                expect(JSON.parse(response.body)['data'].count).to eq(1)
            end 
        end
    end
    
    describe "GET #read" do
        context "Authorization test (CANCAN)" do
            it "it refuse not logged user" do
                request.env['warden'].stub(:authenticate!).and_throw(:warden, {:scope => :user})
                
                pt = FactoryGirl.create(:entity) 
                
                get :read, :id => pt.id, :format => :json
    
                expect(response).not_to be_success
                expect(response.status).to eq(401)
            end
            
            it "it refuse user not logged as admin" do
                user = FactoryGirl.build(:user)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                get :read, :id => pt.id, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(403)
            end
            
            it "it allow user logger as admin" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                get :read, :id => pt.id, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
            end
        end
        context "Behavior test" do
            it "it throw error if id doesnt exist" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                get :read, :id => 9999, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(500)
            end
            it "it return entity" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                get :read, :id => pt.id, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
                expect(JSON.parse(response.body)['meta']['is_new']).to eq(false)
                expect(JSON.parse(response.body)['data']['id']).to eq(pt.id)
            end
        end
    end
    
    describe "GET #get_new" do
        context "Authorization test (CANCAN)" do
            it "it refuse not logged user" do
                request.env['warden'].stub(:authenticate!).and_throw(:warden, {:scope => :user})
                
                pt = FactoryGirl.create(:entity) 
                
                get :get_new, :id => pt.id, :format => :json
    
                expect(response).not_to be_success
                expect(response.status).to eq(401)
            end
            
            it "it refuse user not logged as admin" do
                user = FactoryGirl.build(:user)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                get :get_new, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(403)
            end
            
            it "it allow user logger as admin" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                get :get_new, :format => :json

                expect(response).to be_success
                expect(response.status).to eq(200)
            end
        end
        context "Behavior test" do
            it "it return new entity" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                get :get_new, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
                expect(JSON.parse(response.body)['meta']['is_new']).to eq(true)
            end
        end
    end
    
    describe "DELETE #delete" do
        context "Authorization test (CANCAN)" do
            it "it refuse not logged user" do
                request.env['warden'].stub(:authenticate!).and_throw(:warden, {:scope => :user})
                
                pt = FactoryGirl.create(:entity) 
                
                delete :delete, :id => pt.id, :format => :json
    
                expect(response).not_to be_success
                expect(response.status).to eq(401)
            end
            
            it "it refuse user not logged as admin" do
                user = FactoryGirl.build(:user)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                delete :delete, :id => pt.id, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(403)
            end
            
            it "it allow user logger as admin" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                delete :delete, :id => pt.id, :format => :json

                expect(response).to be_success
                expect(response.status).to eq(200)
            end
        end
        context "Behavior test" do
            it "it delete the entity" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity) 
                
                expect(Entity.count).to eq(1)
                
                delete :delete, :id => pt.id, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
                expect(Entity.count).to eq(0)
            end
        end
    end
    
    describe "PUT #update" do
        context "Authorization test (CANCAN)" do
            it "it refuse not logged user" do
                request.env['warden'].stub(:authenticate!).and_throw(:warden, {:scope => :user})
                
                put :update, :id => -1, :format => :json
    
                expect(response).not_to be_success
                expect(response.status).to eq(401)
            end
            
            it "it refuse user not logged as admin" do
                user = FactoryGirl.build(:user)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                put :update, :id => -1, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(403)
            end
            
            it "it allow user logger as admin" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                put :update, :id => nil, :entity => FactoryGirl.build(:entity).attributes, :format => :json
                
                pp response.body
                
                expect(response).to be_success
                expect(response.status).to eq(200)
            end
        end
        
        context "Behavior test" do
           it "it create new entity if id is blank" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                expect(Entity.count).to eq(0)
                
                put :update, :id => nil, :entity => FactoryGirl.build(:entity).attributes, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
                expect(Entity.count).to eq(1)
           end
           
           it "it update entity if id is provided" do
                user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                pt = FactoryGirl.create(:entity)
                
                expect(Entity.count).to eq(1)
                
                newPt = FactoryGirl.build(:entity)
                newPt.name = "new_pt"
                
                put :update, :id => pt.id, :entity => newPt.attributes, :format => :json
                
                expect(response).to be_success
                expect(response.status).to eq(200)
                expect(Entity.count).to eq(1)
                expect(Entity.last.name).to eq("new_pt")
           end
           
           it "it throw error if id provided doesnt exist" do
               user = FactoryGirl.build(:admin)
                request.env['warden'].stub :authenticate! => user
                controller.stub :current_user => user
                
                put :update, :id => 999, :entity => FactoryGirl.build(:entity).attributes, :format => :json
                
                expect(response).not_to be_success
                expect(response.status).to eq(500)
                expect(Entity.count).to eq(0)
           end
        end
    end
end