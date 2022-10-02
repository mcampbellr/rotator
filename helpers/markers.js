const config = require('./config')
const path = require('path')

const inquirer = require('inquirer')
const { success, error } = require('./chalker')

const json = config.readConfig()
const currentPath = process.cwd()
const pathname = path.basename(currentPath)

const { currentEnv } = json

const markers = async (flags) => {
  const mark = !!(flags.m || flags.mark)
  const unmark = !!(flags.u || flags.unmark)
  const clean = !!(flags.c || flags.clean)
  const switchEnv = !!(flags.s || flags.switch)
  const newEnv = !!(flags.n || flags.new)

  if (clean) return cleanMarkers()
  if (switchEnv) return selectEnviroment()
  if (newEnv) return addEnviroment()
  if (mark && unmark) return success('Please specify a Mark or Unmark action')

  if (mark) {
    markPath()
  } else if (unmark) {
    const { confirmation } = await inquirer.prompt([
      {
        type: 'confirm',
        default: false,
        name: 'confirmation',
        message: 'Are you sure you want to unmark this path?'
      }
    ])

    if (confirmation) {
      return unmarkPath()
    }

    error('Action unmark cancelled')
  }
}

const unmarkPath = () => {
  if (json[currentEnv][pathname]) {
    if (json[currentEnv][pathname] === currentPath) {
      delete json[currentEnv][pathname]
      config.writeConfig(json)
      return success('Path has been unmarked')
    } else {
      return error('Conflict in path name', json)
    }
  }

  success('Path not found in markers')
}

const markPath = () => {
  const path = pathname.replace(/[^a-zA-Z0-9]/g, '')

  if (json[currentEnv])
    if (json[currentEnv][path]) {
      error('Path name already marked')
    } else {
      json[currentEnv][path] = currentPath
      config.writeConfig(json)
      success('Path has been marked')
    }
}

const cleanMarkers = async () => {
  const markers = config.readConfig()
  const { target } = await inquirer.prompt([
    {
      type: 'list',
      choices: Object.keys(markers[currentEnv]),
      name: 'target',
      message: 'Select a marker to remove'
    }
  ])
  if (!target) return

  delete json[currentEnv][target]
  config.writeConfig(json)
  return success('Path has been cleaned successfull')
}

const selectEnviroment = async () => {
  const { envs } = json

  const { env } = await inquirer.prompt([
    {
      type: 'list',
      choices: envs.map((el) => (el === currentEnv ? `${el} (current)` : el)),
      name: 'env',
      message: 'Select a environment to use'
    }
  ])

  if (env.includes('(current)')) {
    return error('You`re already in this environment')
  }

  json.currentEnv = env
  config.writeConfig(json)
  return success(`Environment changed successfully to ${env}`)
}

const addEnviroment = async () => {
  const { newEnv } = await inquirer.prompt([
    {
      type: 'input',
      name: 'newEnv',
      message: 'Select the name of the new environment'
    }
  ])

  if (!json.envs) {
    json.envs = [newEnv]
  } else {
    if (json.envs.includes(newEnv)) return error(`Name ${newEnv} already taken`)

    json.envs.push(newEnv)
    json[newEnv] = {}
    json.currentEnv = newEnv
    config.writeConfig(json)
  }

  return success('New environment create')
}

module.exports = markers
