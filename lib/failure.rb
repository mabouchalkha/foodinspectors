class Failure < Devise::FailureApp
    def respond
        self.status = 401
        self.content_type = 'json'
        self.response_body = '{ "success":"false", "info":"Access denied" }'
    end
end