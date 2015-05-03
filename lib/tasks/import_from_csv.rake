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

  task :locations => :environment do
    file_name = ENV['FILENAME']
    file_path = Rails.root + "lib/csv" + file_name
    record_count = 0
    CSV.foreach(file_path, headers: true, header_converters: :symbol) do |row|
      location = Location.new(row.to_h)
      if location.save
        record_count += 1
      end

      puts "Processed #{record_count} rows" if record_count % 100 == 0
    end
    puts "#{record_count} location records created."
  end

  task :transactions => :environment do
    file_name = ENV['FILENAME']
    file_path = Rails.root + "lib/csv" + file_name
    record_count = 0
    CSV.foreach(file_path, headers: true, header_converters: :symbol) do |row|
      row[:amount] = row[:amount].to_f
      transaction_type = row.delete(:transaction_type)[1]

      klass = case transaction_type
              when "earning" then Earning
              when "charge" then Charge
              end

      transaction = klass.new(row.to_h)

      if transaction.save
        record_count += 1
      end
    end
    puts "#{record_count} transaction records created."
  end
end