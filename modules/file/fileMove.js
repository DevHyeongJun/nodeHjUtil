const Utils = require('../../util/Utils.js');

const ncp = require('ncp').ncp; 
const fs = require("fs-extra");

module.exports = fileMoveWork = (toPath, fromPath) => {
  //1. 목록 정보 추출
  fs.readdir(toPath, (err, filelist) => {
    //2. 목록 상세 정보 가져오기
    filelist.forEach(function(file) {

      const to = `${toPath}/${file}`;
        //3. 파일 정보 추출
        fs.stat(to, function (statErr, stats) {

          const createDate = new Date( stats.birthtimeMs );
          const from = `${dirDateFolderName(createDate, fromPath)}/${file}`;

          //4. 정보 확인하고 삭제
          ncp(to, from, {clobber : true}, function (ncpErr) {
            if (ncpErr) return console.error(ncpErr);
            //5. 잔여 폴더 파일 삭제
            removeFileNFolder(to, stats);
          });
        });
      });
  });
}

const dirDateFolderName = (_date, from) => {

  const date = Utils.getDate(_date);
  const ymd = Utils.convertYMD(date);
  const dirPath = `${from}/${ymd}`;

  const isExists = fs.existsSync( dirPath );

  if ( !isExists ) {
    fs.mkdirSync( dirPath, { recursive: true } );
  }

  return dirPath;
}

const removeFileNFolder = (target, stats) => {
  fs.remove(target, (err) =>{
    if (!err) {
      if ( fs.existsSync(target) ) {
        fs.rmdir(fs);
      }
    }
  });
}
