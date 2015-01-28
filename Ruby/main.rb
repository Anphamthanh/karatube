require 'filewatcher'

files = [
  "../public/assets/javascripts/ui.js",
  "../public/controllers/controllers.js"
]

files.each do |file|
  unless File.exist?(file)
    puts "File #{file} does not exist."
  end 
end

FileWatcher.new(files).watch do |file_name|
  puts "Changed #{file_name}"
end