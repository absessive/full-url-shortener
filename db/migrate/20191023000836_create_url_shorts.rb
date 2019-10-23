class CreateUrlShorts < ActiveRecord::Migration[6.0]
  def change
    create_table :url_shorts do |t|
      t.string :full_url
      t.string :short_url, index: { unique: true }
      
      t.timestamps
    end
  end
end
