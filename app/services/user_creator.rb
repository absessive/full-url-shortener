class UserCreator
  def initialize(email, name, password)
    @email = email
    @name = name
    @password = password
  end

  def create
    User.create(email: @email, name: @name, password: @password)
  end
end