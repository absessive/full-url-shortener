module Api
  module V1
    class UrlShorts < Grape::API
      include Api::V1::Defaults

      resource :url_shorts do
        desc 'Returns the full URL'
        params do
          requires :short_url, type: String, desc: 'Short URL associated with a UrlShort'
        end
        get ':short_url', root: 'short_url' do
          authenticate_request
          url_short = UrlShort.find_by(short_url: permitted_params[:short_url], user: current_user)
          {
            full_url: url_short.full_url,
            short_url: params[:short_url],
            logged_in: current_user.present?
          }
        end

        desc 'Creates and/or returns short URL from a full URL'
        params do
          requires :full_url, type: String, desc: 'Full url that needs to be shortened'
        end
        post "/new" do
          authenticate_request
          url_short = UrlShortCreator.new(params[:full_url], current_user).create
          {
            full_url: params[:full_url],
            short_url: url_short.short_url,
            logged_in: current_user.present?
          }
        end
      end
    end
  end
end
