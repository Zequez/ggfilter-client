var testsContext = require.context('../src/', true, /(\.spec\.jsx?$)|(\.spec\.coffee$)/)
testsContext.keys().forEach(testsContext)
