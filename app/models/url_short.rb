class UrlShort < ApplicationRecord
  validates :full_url, presence: true
  validates :short_url, uniqueness: true

  before_save :create_short_url

  BLAKE_KEY = Blake2::Key.none

  def create_short_url
    out_len = 4
    self.short_url = Blake2.hex(full_url, BLAKE_KEY, out_len)
  end
end
