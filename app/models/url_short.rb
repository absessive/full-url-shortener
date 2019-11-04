class UrlShort < ApplicationRecord
  validates :full_url, presence: { strict: true }
  validates :full_url, url: { strict: true }
  validates :short_url, uniqueness: { strict: true }
  belongs_to :user
end
