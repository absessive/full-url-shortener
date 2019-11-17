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
          url_short = UrlShort.find_by(short_url: permitted_params[:short_url], 
            user: current_user)
          represent url_short
        end

        desc 'Deletes the associated record'
        params do
          requires :short_url, type: String, desc: 'Short URL associated with a UrlShort'
        end
        delete ':short_url', root: 'short_url' do
          authenticate_request
          url_short = UrlShort.find_by(short_url: permitted_params[:short_url],
            user: current_user)
          url_short.destroy
          represent url_short          
        end

        desc 'Creates and/or returns short URL from a full URL'
        params do
          requires :full_url, type: String, desc: 'Full url that needs to be shortened'
        end
        post '/new' do
          authenticate_request
          url_short = UrlShortCreator.new(params[:full_url], current_user).create
          represent url_short
        end

        desc 'Get list of all short URLs created by user'
        get '/' do
          authenticate_request
          url_shorts = UrlShort.where(user: current_user)
          url_shorts.extend(UrlShortRepresenter.for_collection)
        end
      end
    end
  end
end
