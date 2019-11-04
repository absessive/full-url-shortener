require 'rails_helper'

describe UrlShort, type: :model do
  let(:url_short) { create(:url_short) }
  it 'creates a short URL' do
    expect(url_short.short_url).not_to be_nil
    expect(url_short.short_url).to be_a(String)
  end
end
