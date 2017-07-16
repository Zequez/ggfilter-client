require 'json'

version = JSON.load(File.read('./package.json'))['version']
gemspec = File.read('../client-gem/ggfilter_client.gemspec')
  .sub(/(version = ')([^']+)(')/, "\\1#{version}\\3")
File.write('../client-gem/ggfilter_client.gemspec', gemspec)
