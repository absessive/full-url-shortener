FactoryBot.define do
  factory :user do
    name { "Name" }
    email { "email@example.com" }
    password { "password" }
    password_digest { "password_digest" }
  end
end
