module Api
  module V1
    class Redirects < Grape::API
      include Api::V1::Defaults
      prefix ''
      resource :to do
        desc 'Redirects to the full URL'
        params do
          requires :short_url, type: String, desc: 'Short url associated with a UrlShort'
        end
        get ':short_url' do
          authenticate_request
          url_short = UrlShort.find_by_short_url(permitted_params[:short_url])
          redirect url_short.full_url
        end
      end
    end
  end
end
