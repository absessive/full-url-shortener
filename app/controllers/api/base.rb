module Api
  class Base < Grape::API
    format :json
    mount Api::V1::Base
  end
end
