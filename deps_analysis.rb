require 'json'

`./node_modules/webpack/bin/webpack.js --profile --json > stats.json`

a = JSON.load File.read 'stats.json'

reject = ->(m) { m['id'].kind_of?(String) ? m['id'] =~ /node_modules|\.sass$/ : true }

a['chunks'][0]['modules'].reject!(&reject)
a['modules'].reject!(&reject)

File.write 'stats2.json', JSON.pretty_generate(a)
