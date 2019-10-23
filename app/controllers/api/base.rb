require "grape-swagger"

module Api
  class Base < Grape::API
    format :json
    mount Api::V1::Base
    add_swagger_documentation
  end
end
