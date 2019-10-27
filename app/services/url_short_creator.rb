class UrlShortCreator
  BLAKE_KEY = Blake2::Key.none

  def initialize(full_url, user = nil)
    @full_url = full_url
    @user = user
  end

  def create
    UrlShort.create(full_url: @full_url, short_url: short_url, user: @user)
  end

  private

  def short_url
    out_len = 4
    key = @user&.email ? Blake2::Key.from_string(@user.email) : BLAKE_KEY
    Blake2.hex(@full_url, key, out_len)
  end
end
