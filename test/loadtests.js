var testsContext = require.context('.', true, /(Test\..+$)|(Helper\..+$)/);
testsContext.keys().forEach(testsContext);
