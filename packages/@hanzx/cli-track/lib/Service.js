const { run } = require('runjs');

module.exports = class Service {
  constructor() {
    this.commands = {};
  }

  async run(name, args = {}, rawArgv = []) {
    let command = this.commands[name];
    if (!command && name) {
      error(`command "${name}" does not exist.`);
      process.exit(1);
    }

    return run(`vue-cli-service ${name}`, { async: true })
  }
}