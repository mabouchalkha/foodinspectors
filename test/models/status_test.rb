require "test_helper"

describe PayementTerm do
    let(:payement_term_params_invalid) { {name: 'Tomorrow', due_in_days: nil} }
    let(:payement_term_invalid) { PayementTerm.new payement_term_params_invalid }
    let(:payement_term_params) { {name: 'Tomorrow', due_in_days: 1} }
    let(:payement_term) { PayementTerm.new payement_term_params }
    
    it "is invalid with invalid params" do
        assert !payement_term_invalid.valid?, "Can create with invalid params: #{payement_term.errors.messages}"
    end
    
    it "is valid with valid params" do
        assert payement_term.valid? "Can't create with valid params: #{payement_term.errors.messages}"
    end
    
    it "return tomorrow as get_due_date" do
        pt =  payement_term
        due = pt.get_due_date.to_date
        
        current = Time.now + pt.due_in_days.days
        
        due.must_equal current.to_date
        #assert_equal current.to_date, due.to_date, "Due date should be #{current.to_date}, but was #{due.to_date}"
    end
end