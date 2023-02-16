#!/usr/bin/env node

const Service = require('../lib/Service');
const service = new Service(process.cwd());

const watcher = require('./watcher');
const mergeFiles = require('./mergeFiles');
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)

const project = args?.project;

// 合并基线和定制目录生成新的项目目录
mergeFiles(['base', project])

// 监听文件，及时更新新目录中的代码
watcher('./packages', project || 'base');


const command = args._[0]


service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})