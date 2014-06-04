require 'faker'

FactoryGirl.define do
   factory :payement_term do |p|
      p.name { Faker::Lorem.words(1).join() }
      p.due_in_days { Faker::Number.digit }
   end
end