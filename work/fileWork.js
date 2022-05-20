
const GlobalConfig = require('../config.js');
const fileMoveWork = require('../modules/file/fileMove.js');

const {nate, web} = GlobalConfig.file;

fileMoveWork(nate.toFilePath, nate.fromFilePath);
fileMoveWork(web.toFilePath, web.fromFilePath);