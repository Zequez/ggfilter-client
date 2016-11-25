require 'json'

version = JSON.load(File.read('./package.json'))['version']
gemspec = File.read('./gem/ggfilter_client.gemspec')
  .sub(/(version = ')([^']+)(')/, "\\1#{version}\\3")
File.write('./gem/ggfilter_client.gemspec', gemspec)
