module Api
  module V1
    module Defaults
      extend ActiveSupport::Concern

      included do
        prefix 'api'
        version 'v1', using: :path
        default_format :json
        format :json
        formatter :json, lambda { |object, env|
          object.to_json(user_options: { base_url: env['HTTP_HOST'] })
        }

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

          def represent object_or_collection
            if object_or_collection.respond_to?(:each)
              return [] if object_or_collection.to_a.empty?
              object = object_or_collection.first
              representer = "#{object.class}Representer".constantize
              object_or_collection.extend(representer.for_collection)
            else
              object = object_or_collection
              representer = "#{object.class}Representer".constantize
              object_or_collection.extend(representer)
            end
          end
        end

        rescue_from ActiveRecord::RecordNotFound do |e|
          Rails.logger.error(e.message)
          error_response(message: e.message, status: 404)
        end

        rescue_from ActiveRecord::RecordInvalid do |e|
          Rails.logger.error(e.message)
          error_response(message: e.message, status: 422)
        end

        rescue_from ActiveModel::StrictValidationFailed do |e|
          Rails.logger.error(e.message)
          error_response(message: e.message, status: 422)
        end

        rescue_from NoMethodError do |e|
          Rails.logger.error(e.message)
          error_response(message: e.message, status: 404)
        end

        rescue_from NameError do |e|
          byebug
          Rails.logger.error(e.message)
          error_response(message: e.message, status: 404)
        end

        rescue_from ApplicationController::NotAuthorized do |e|
          Rails.logger.error(e.message)
          error_response(message: e.message, status: 401)
        end
      end
    end
  end
end
