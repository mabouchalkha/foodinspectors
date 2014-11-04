ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "minitest/spec"
 
class ActiveSupport::TestCase
    ActiveRecord::Migration.check_pending!
    fixtures :all
    
    class << self
        remove_method :describe
    end
    
    extend MiniTest::Spec::DSL
    
    register_spec_type self do |desc|
        desc < ActiveRecord::Base if desc.is_a? Class
    end
end