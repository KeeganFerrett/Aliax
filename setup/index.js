'use strict'
const inquirer  = require('inquirer')
const fs        = require('fs')

const shells = {
  'bash': '.bashrc',
  'fish': '.fishrc',
  'zshell': '.zshrc',
}

const questions = [
  {
    type: 'list',
    name: 'shell',
    message: 'Shell:',
    choices: ['Bash', 'Zshell', 'Fish'],
    filter: function(val) {
      return val.toLowerCase()
    }
  }
]

const confirm = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Continue?',
    default: false
  }
]

module.exports = async (options) => {
  if (options.shell === true) {
    // Shell option used without providing a shell
    console.log('Please provide a valid shell program when using the --shell command [bash, zshell, fish]')
    return
  }
  let shell   = ''
  let anwsers = {}
  let shellrc = ''

  const aliasfolder   = '.aliases'
  const aliassymlink  = 'aliases.symlink'
  const link          = `# ALIAX #\nsource ${aliasfolder}/${aliassymlink}\n`

  if (!options.shell) {
    anwsers = await inquirer.prompt(questions)
  }

  shell = options.shell || anwsers.shell || 'bash'
  shellrc = shells[shell]

  let createfolder  = !fs.existsSync(`${process.env.HOME}/${aliasfolder}/`)
  let createfile    = !fs.existsSync(`${process.env.HOME}/${aliasfolder}/${aliassymlink}`)

  console.log('Operations:')
  if (createfolder) {
    console.log(`\tCreate the ${aliasfolder} folder in your home directory`)
  }
  if (createfile) {
    console.log(`\tCreate the ${aliassymlink} file in your ${aliasfolder} folder`)
  }
  console.log(`\tLink ${aliassymlink} in your ${shellrc}`)

  const confirms = await inquirer.prompt(confirm)

  if (!confirms.confirm) {
    return
  }

  if (createfolder) {
    fs.mkdirSync(`${process.env.HOME}/${aliasfolder}/`)
  }
  if (createfile) {
    fs.appendFileSync(`${process.env.HOME}/${aliasfolder}/${aliassymlink}`, '')
  }
  fs.appendFileSync(`${process.env.HOME}/${shellrc}`, link)

  console.log('\x1b[32m\u2713\x1b[0m Done')
}
