
const GlobalConfig = require('D:/node/config.js');
const fileMoveWork = require('D:/node/modules/file/fileMove.js');

const {nate, web} = GlobalConfig.file;
console.log('/123213');
fileMoveWork(nate.toFilePath, nate.fromFilePath);
fileMoveWork(web.toFilePath, web.fromFilePath);