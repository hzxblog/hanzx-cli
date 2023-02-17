const chokidar = require('chokidar');
const fs = require("fs");
const path = require("path");

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = function watcher(path, module) {
  const watcher = chokidar.watch(path, {
    persistent: true,
    ignoreInitial: true
  });

  function add(path) {
    console.log('add File', path, 'has been changed');
  }
  
  function unlink(path) {
    console.log(`delete File ${path} has been added`)
  }
  
  function change (path) {
    const editUrl = path.replace(`packages\\${module}\\`, '').replace('packages\\base\\', '')
    console.log('File', editUrl, 'has been changed');
    fs.writeFileSync(resolve(`../src/${editUrl}`), fs.readFileSync(resolve(`../${path}`)));
  }
  
  function addDir(path) {
    console.log(`add Directory ${path} has been added`)
  }
  
  function unlinkDir(path) {
    console.log(`delete Directory ${path} has been removed`)
  }
  
  function ready() {
    console.log('Initial scan complete. Ready for changes.');
  }

  watcher
    .on('change', change)
    .on('add', add)
    .on('unlink', unlink)
    .on('addDir', addDir)
    .on('unlinkDir', unlinkDir)
    .on('ready', ready);
}