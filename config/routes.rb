Rails.application.routes.draw do
  mount Api::Base, at: '/'
  post 'authenticate', to: 'authentication#authenticate'
end
