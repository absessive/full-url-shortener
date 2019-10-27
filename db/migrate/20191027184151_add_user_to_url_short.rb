class AddUserToUrlShort < ActiveRecord::Migration[6.0]
  def change
    add_reference :url_shorts, :user, null: true, foreign_key: true
  end
end
