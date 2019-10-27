module Api
  module V1
    module Defaults
      extend ActiveSupport::Concern

      included do
        prefix "api"
        version "v1", using: :path
        default_format :json
        format :json

        helpers do
          def permitted_params
            @permitted_params ||= declared(params,
                                           include_missing: false)
          end

          def logger
            Rails.logger
          end

          def authenticate_request            
            @current_user = AuthorizeApiRequest.call(request.headers).result                        
          end

          def current_user
            @current_user
          end
        end

        rescue_from ActiveRecord::RecordNotFound do |e|
          error_response(message: e.message, status: 404)
        end

        rescue_from ActiveRecord::RecordInvalid do |e|
          error_response(message: e.message, status: 422)
        end

        rescue_from ActiveModel::StrictValidationFailed do |e|
          error_response(message: e.message, status: 422)
        end

        rescue_from NoMethodError do |e|
          error_response(message: e.message, status: 404)
        end
      
        rescue_from ApplicationController::NotAuthorized do |e|
          error_response(message: e.message, status: 401)
        end
      end
    end
  end
end
