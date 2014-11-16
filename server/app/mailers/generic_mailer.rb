class GenericMailer < ActionMailer::Base
    default from: 'info@food_inspector.com'
    
    def welcome_email(user)
        @name = user.first_name + ' ' + user.last_name
        @url  = 'https://food_inspector-c9-doum.c9.io/#/login'
        @user_name = user.user_name
        mail(to: user.email, subject: 'Welcome to Food Inspector')
    end
    
    def retrieve_password(user)
       @pwd = user.password
       @name = user.first_name + ' ' + user.last_name
       @url  = 'https://food_inspector-c9-doum.c9.io/#/login'
       mail(to: user.email, subject: 'New password')
    end
end