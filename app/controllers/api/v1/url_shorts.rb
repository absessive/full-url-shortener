module Api
  module V1
    class UrlShorts < Grape::API
      include Api::V1::Defaults

      resource :url_shorts do
        desc "Return the full URL"
        params do
          requires :short_url, type: String, desc: "Short url associated with a UrlShort"
        end
        get ":short_url", root: "short_url" do
          UrlShort.find_by_short_url(permitted_params[:short_url]).full_url
        end
      end
    end
  end
end
