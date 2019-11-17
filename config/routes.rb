Rails.application.routes.draw do
  mount Api::Base, at: '/'

  get '*path', to: "static_file#fallback_index_html"
end
