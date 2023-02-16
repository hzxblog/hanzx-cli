const copyFiles = require('./copyFiles');
const path = require('path');


module.exports = function mergeFiles(files) {
  copyFiles(
    path.join(__dirname, `../packages/${files[0]}`), 
    path.join(__dirname, '../src'), 
    () => {}
  );
  copyFiles(
    path.join(__dirname, `../packages/${files[1]}`), 
    path.join(__dirname, '../src'), 
    () => {}
  );
}