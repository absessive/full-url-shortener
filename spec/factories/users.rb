FactoryBot.define do
  factory :user do
    name { 'Lando Calrissian' }
    email { 'land@example.com' }
    password { 'password' }
    password_digest { BCrypt::Password.create('password').to_s }
  end
end
