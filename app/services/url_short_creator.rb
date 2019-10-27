class UrlShortCreator
  BLAKE_KEY = Blake2::Key.none
  # Use email as key 
  # key = Blake2::Key.from_string("foo bar baz")

  def initialize(full_url)
    @full_url = full_url
  end

  def create
    UrlShort.create(full_url: @full_url, short_url: short_url)
  end

  private

  def short_url
    out_len = 4
    Blake2.hex(@full_url, BLAKE_KEY, out_len)
  end
end
