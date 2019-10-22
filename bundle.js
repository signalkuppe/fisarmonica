const UglifyJS = require('uglify-js')
const CleanCSS = require('clean-css')
const fs = require('fs')

try {
  const jsSource = fs.readFileSync('./src/fisarmonica.js', 'UTF-8')
  const jsMinified = UglifyJS.minify(jsSource)
  const cssSource = fs.readFileSync('./src/fisarmonica.css', 'UTF-8')
  const cssMinified = new CleanCSS().minify(cssSource)
  fs.writeFileSync('./dist/fisarmonica.min.js', jsMinified.code, 'UTF-8')
  fs.writeFileSync('./dist/fisarmonica.min.css', cssMinified.styles, 'UTF-8')
  console.log('All files minified!')
} catch (err) {
  console.log('Minify error', err)
  process.exit()
}
