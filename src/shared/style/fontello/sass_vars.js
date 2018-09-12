const fs = require('fs');
const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));
let vars = [];
config.glyphs.forEach((g) => {
  vars.push(`$fa-var-${g.css}: "\\${g.code.toString(16)}";`);
})
fs.writeFileSync(`${__dirname}/sass_vars.scss`, vars.join("\n"));
