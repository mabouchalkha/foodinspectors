require 'spec_helper'

describe Entity do
    it "has a valid factory" do
        FactoryGirl.create(:entity).should be_valid
    end
    
    it "is not valid without name" do
        FactoryGirl.build(:entity, name: nil).should_not be_valid 
    end
   
    it "has a uniq name" do
       entity = FactoryGirl.create(:entity);
       FactoryGirl.build(:entity, name: entity.name).should_not be_valid 
   end
end
