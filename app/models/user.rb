class User < ApplicationRecord
  has_secure_password
  has_many :url_shorts
end
