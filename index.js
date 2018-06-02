#!/usr/bin/env node

'use strict'
const program = require('commander')

const { version } = require('./package.json')

const setup   = require('./setup')
const create  = require('./create')

// Declare version number
program
  .version(`v${version}`, '-v, --version')

program
  .command('setup')
  .description('Set up shell for use with Aliax')
  .alias('s')
  .option('-s, --shell [shell]', 'Provide shell to prepare', /^(bash|zshell|fish)$/i)
  .action(setup)

program
  .command('new')
  .description('Create a new alias')
  .alias('n')
  .action(create)


try {
  program.parse(process.argv)
} catch (e) {
  console.log(e)
}
