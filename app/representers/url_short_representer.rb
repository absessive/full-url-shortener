require 'roar/decorator'
require 'roar/json'

class UrlShortRepresenter < Roar::Decorator
  include Roar::JSON

  property :id
  property :full_url
  property :short_url  
end