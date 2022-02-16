const Color = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m'
}

const colorString = (color, string) => {
  return `${color}${string}${Color.Reset}`
}

const colorLog = (color, ...args) => {
  console.log(
    ...args.map((it) => (typeof it === 'string' ? colorString(color, it) : it))
  )
}

const success = (msg) => {
  colorLog(Color.FgGreen, `✅ ${msg}`)
}

const error = (msg) => {
  colorLog(Color.FgRed, `⛔️ ${msg}`)
}

module.exports = {
  success,
  error
}
