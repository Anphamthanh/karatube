require 'filewatcher'
require 'uglifier'

files = [
  "../public/assets/javascripts/ui.main.js",
  "../public/controllers/controllers.main.js"
]

files.each do |file|
  unless File.exist?(file)
    puts "File #{file} does not exist."
  end 
end

FileWatcher.new(files).watch do |file_name|
  puts "Changed in #{file_name}"
  minified = Uglifier.compile(File.read(file_name))
  File.write("#{file_name.sub('main.js','min.js')}", minified)
end