require "rack"
require "uri"

module Rack
  class EscapedFragment
    def initialize(app, opts={})
      @app = app
      @opts = opts
    end
    
    def call(env)
      req = ::Rack::Request.new(env)
      
      if fragment = req.params["_escaped_fragment_"]
        original_fullpath = req.fullpath
        
        uri = URI.parse(fragment)
        new_path = uri.path =~ /\.html$/ ? uri.path : uri.path + ".html"

        env["PATH_INFO"]    = @opts[:snapshots_dir] + new_path
        env["QUERY_STRING"] = uri.query || ""
        env["REQUEST_URI"]  = req.fullpath
        
        logger.info "Rack::EscapedFragment #{original_fullpath} => #{req.fullpath}"
      end
      
      @app.call(env)
    end
    
    private
    
    def logger
      ::Rails.logger
    end
    
  end
end

