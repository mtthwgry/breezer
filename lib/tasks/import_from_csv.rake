require 'csv'

namespace :import_from_csv do
  task :users => :environment do
    file_name = ENV['FILENAME']
    file_path = Rails.root + "lib/csv" + file_name
    record_count = 0
    CSV.foreach(file_path, headers: true, header_converters: :symbol) do |row|
      user = User.new(row.to_h)
      if user.save
        record_count += 1
      end
    end
    puts "#{record_count} users created."
  end
end