require 'roar/decorator'
require 'roar/json'

module ShortUrlRepresenter
  include Roar::JSON
  include Roar::Hypermedia

  property :id
  property :full_url
  property :short_url
  property :share,    
    getter: -> (options, **) { "#{options[:user_options][:base_url]}/v1/to/#{represented.short_url}" }
end