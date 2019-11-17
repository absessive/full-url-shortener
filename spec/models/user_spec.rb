require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  it 'has email and password' do
    expect(user.email).not_to be_nil
    expect(user.password_digest).to be_a(String)
  end
end
