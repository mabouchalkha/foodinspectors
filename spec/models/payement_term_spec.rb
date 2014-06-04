require 'spec_helper'

describe PayementTerm do
   it "has a valid factory" do
       FactoryGirl.create(:payement_term).should be_valid
   end
   
   it "is not valid without name" do
      FactoryGirl.build(:payement_term, name: nil).should_not be_valid 
   end
   
   it "has a uniq name" do
       pt = FactoryGirl.create(:payement_term);
       FactoryGirl.build(:payement_term, name: pt.name).should_not be_valid 
   end
   
   it "is not valid wihout due_in_days" do
       FactoryGirl.build(:payement_term, due_in_days: nil).should_not be_valid 
   end
   
   it "is later by due_in_days days than now" do
       pt = FactoryGirl.build(:payement_term) 
       pt.get_due_date.day.should == (Time.now + pt.due_in_days.days).day
   end
end