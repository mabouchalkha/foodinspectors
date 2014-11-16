Airbrake.configure do |config|
  config.ignore_only = []
  config.development_environments = []
  config.api_key = '0739dd9c53c8b879dcfc909bd9d3bbfd'
  config.host    = 'errbitrails.herokuapp.com'
  config.port    = 80
  config.secure  = config.port == 443
  config.user_attributes = [:id, :name, :email]
end