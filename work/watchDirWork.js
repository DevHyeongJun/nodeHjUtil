/**
 * 지정된 경로에 파일을 날짜 별로 구분한다.
 */
const GlobalConfig = require('../config.js');
const fileMoveWork = require('../modules/file/fileMove.js');
const fs = require("fs-extra");

const {nate, web} = GlobalConfig.file;

fileMoveWork(nate.toFilePath, nate.fromFilePath);
fileMoveWork(web.toFilePath, web.fromFilePath);

//디렉토리 감지 - 네이트온 받은 파일
fs.watch(nate.toFilePath, () => {
    fileMoveWork(nate.toFilePath, nate.fromFilePath);
});

//디렉토리 감지 - 브라우저 다운로드 파일
fs.watch(web.toFilePath, () => {
   fileMoveWork(web.toFilePath, web.fromFilePath);
});