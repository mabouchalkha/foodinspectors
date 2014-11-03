require 'spec_helper'

describe Status do
  it "has a valid factory" do
        FactoryGirl.create(:status).should be_valid
    end
    
    it "is not valid without name" do
        FactoryGirl.build(:status, name: nil).should_not be_valid 
    end
    
    it "is not valid without display_id" do
        FactoryGirl.build(:status, display_id: nil).should_not be_valid 
    end
    
    it "is not valid without entity_id" do
        FactoryGirl.build(:status, entity_id: nil).should_not be_valid 
    end
   
    it "has a uniq display_id" do
       status = FactoryGirl.create(:status, display_id: 'TEST');
       FactoryGirl.build(:status, display_id: 'TEST').should_not be_valid 
    end
    
    it "respond to entity" do
        entity =  FactoryGirl.create(:entity);
        status = FactoryGirl.create(:status, entity_id: entity.id)
        status.should respond_to(:entity)
        expect(status.entity.id).to eq(entity.id)
    end
end
