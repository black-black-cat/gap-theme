const fs = require('fs')
const path = require('path')
const generate = require('./generate')
const {readFile, writeFile} = fs.promises

const THEME_DIR = path.join(__dirname, '..', 'themes')

if (!fs.existsSync(THEME_DIR)) {
  fs.mkdirSync(THEME_DIR)
}

module.exports = async () => {
  const yamlFile = await readFile(path.join(__dirname, '..', 'src', 'gap.yaml'), 'utf-8')

  const { base } = await generate(yamlFile)

  return Promise.all([
    writeFile(path.join(THEME_DIR, 'gap-color-theme.json'), JSON.stringify(base, null, 4))
  ])
}

if (require.main === module) {
  module.exports()
}