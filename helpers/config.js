const fs = require('fs')
const path = require('path')

const { HOME } = process.env

const config = path.join(HOME, '/.local/share/rotator/.rotator.json')
const readConfig = () => JSON.parse(fs.readFileSync(config, 'utf8'))

const writeConfig = (newConfig) => {
  const newJson = JSON.stringify(newConfig)
  fs.writeFileSync(config, newJson)
}

module.exports = {
  readConfig,
  writeConfig
}
