var testsContext = require.context('../src/', true, /(\.spec\.jsx?$)/)
testsContext.keys().forEach(testsContext)
