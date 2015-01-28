require 'filewatcher'

puts File.exist?("../public/assets/javascripts/ui.js")
puts File.exist?("../public/controllers/controllers.js")

FileWatcher.new(["../public/assets/javascripts/ui.js", "../public/controllers/controllers.js"]).watch do |file_name|
  puts "Changed #{file_name}"
end