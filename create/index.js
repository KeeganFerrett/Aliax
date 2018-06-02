#!/usr/bin/env node

'use strict'
const inquirer  = require('inquirer')
const fs        = require('fs')

var questions = [
  {
    type: 'input',
    name: 'group',
    message: "Alias Group:",
    validate: function(value) {
      var pass = value.match(
        /^[a-z]+$/g
      );
      if (pass) {
        return true;
      }

      return 'Alias group name should in all lower case.';
    }
  },
  {
    type: 'input',
    name: 'name',
    message: "Alias Name:",
    validate: function(value) {
      var pass = value.match(
        /^[a-zA-Z_0-9]+$/g
      );
      if (pass) {
        return true;
      }

      return 'Aliae name should be a single string';
    }
  },
  {
    type: 'list',
    name: 'type',
    message: 'Command Type:',
    choices: ['Change Directory', 'Custom'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'command',
    message: 'Enter in your custom command:',
    when: function(answers) {
      return answers.type === 'custom';
    }
  }
]

var confirm = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Continue?',
    default: false
  }
]

module.exports = async (options) => {
  const alias = await inquirer.prompt(questions)
  let command = ''

  if (alias.type === 'change directory') {
    command = `alias ${alias.name}='cd ${process.cwd()}'\n`
  } else {
    command = `alias ${alias.name}='${alias.command}'\n`
  }

  let createFile = !fs.existsSync(`${process.env.HOME}/.aliases/${alias.group}.aliases`)

  console.log('Operations:')
  if (createFile) {
    console.log(`\tCreate file ${alias.group}.aliases`)
    console.log(`\tAdd ${alias.group}.aliases to aliases.symlink`)
  }

  console.log(`\tAppend new alias to ${alias.group}.aliases`)

  const confirms = await inquirer.prompt(confirm)

  if (!confirms.confirm) {
    return
  }

  if (createFile) {
    fs.writeFileSync(`${process.env.HOME}/.aliases/${alias.group}.aliases`, '')
    fs.appendFileSync(`${process.env.HOME}/.aliases/aliases.symlink`, `source ~/.aliases/${alias.group}.aliases\n`)
  }

  fs.appendFileSync(`${process.env.HOME}/.aliases/${alias.group}.aliases`, command)

  console.log('\x1b[32m\u2713\x1b[0m Done')
}
