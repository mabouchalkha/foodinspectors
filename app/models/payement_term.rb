class PayementTerm < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true
    validates :due_in_days,  presence: true
    
    def get_due_date
        # Here will lay businness open's hour logic
        Time.now + self.due_in_days.days
    end
end
