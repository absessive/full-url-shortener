module Api
  module V1
    class UrlShorts < Grape::API
      include Api::V1::Defaults

      resource :url_shorts do
        desc "Return the full URL"
        params do
          requires :short_url, type: String, desc: "Short URL associated with a UrlShort"
        end
        get ":short_url", root: "short_url" do
          UrlShort.find_by_short_url(permitted_params[:short_url]).full_url
        end

        desc "Creates and/or returns short URL from a full URL"
        params do
          requires :full_url, type: String, desc: "Full url that needs to be shortened"
        end
        post "/new" do
          UrlShort.create(full_url: params[:full_url])
        end
      end
    end
  end
end
