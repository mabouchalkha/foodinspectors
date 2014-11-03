# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
    factory :status do
        name { Faker::Lorem.words(1).join() }
        display_id Faker::Lorem.words(1).join().upcase
        entity
    end
end
