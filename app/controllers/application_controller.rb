class ApplicationController < ActionController::API
  NotAuthorized = Class.new(StandardError)
end
