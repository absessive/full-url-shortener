class ApplicationController < ActionController::API  
  NotAuthorized = Class.new(StandardError)

  def fallback_index_html
    render :file => 'public/index.html'
  end
end
