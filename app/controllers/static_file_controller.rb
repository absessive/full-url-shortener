class StaticFileController < ActionController::Base
  def fallback_index_html
    render file: "#{Rails.root}/public/index.html", layout: false
  end
end