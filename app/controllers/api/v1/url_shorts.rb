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
          base_url = request.base_url
          JSON.parse url_short.extend(ShortUrlRepresenter).to_json(user_options: {base_url: base_url})
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
          base_url = request.base_url
          JSON.parse url_short.extend(ShortUrlRepresenter).to_json(user_options: {base_url: base_url})
        end

        desc 'Creates and/or returns short URL from a full URL'
        params do
          requires :full_url, type: String, desc: 'Full url that needs to be shortened'
        end
        post '/new' do
          authenticate_request
          base_url = request.base_url
          url_short = UrlShortCreator.new(params[:full_url], current_user).create
          JSON.parse url_short.extend(ShortUrlRepresenter).to_json(user_options: {base_url: base_url})
        end

        desc 'Get list of all short URLs created by user'
        get '/' do
          authenticate_request
          url_shorts = UrlShort.where(user: current_user)
          base_url = request.base_url
          JSON.parse url_shorts.extend(ShortUrlRepresenter.for_collection).to_json(user_options: {base_url: base_url})
        end
      end
    end
  end
end
