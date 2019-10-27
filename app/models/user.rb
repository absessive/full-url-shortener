class User < ApplicationRecord
  has_secure_password
  validates :password, presence: { strict: true }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :email, uniqueness: { strict: true }
  has_many :url_shorts
end
