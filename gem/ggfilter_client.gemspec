# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

# Automatically changed by client build script
version = '0.1.2'

Gem::Specification.new do |spec|
  spec.name          = "ggfilter_client"
  spec.version       = version
  spec.authors       = ["Zequez"]
  spec.email         = ["zequez@gmail.com"]
  spec.summary       = %q{Gem with the client build for GGFilter}
  spec.description   = %q{}
  spec.homepage      = ""
  spec.license       = "No"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.13.6"
  spec.add_development_dependency "rake", "~> 10.0"
end
