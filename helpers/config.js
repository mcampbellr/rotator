const path = require('path')
const fs = require('fs')
const dotfiles = process.env.DOTFILES

const config = path.join(dotfiles, '.rotator.json')

const readConfig = () => JSON.parse(fs.readFileSync(config, 'utf8'))

const writeConfig = (newConfig) => {
  const newJson = JSON.stringify(newConfig)
  fs.writeFileSync(config, newJson)
}

module.exports = {
  readConfig,
  writeConfig
}
