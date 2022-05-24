const Utils = require('../../util/Utils.js');

const fs = require("fs-extra");

module.exports = fileMoveWork = (toPath, fromPath) => {
 
  try {
    //1. 목록 정보 추출
    const filelist = fs.readdirSync(toPath);//, (err, filelist) => {

    //2. 목록 상세 정보 가져오기
    filelist.forEach(function(file) {

      const to = `${toPath}/${file}`;
      //3. 파일 정보 추출
      const stats = fs.statSync(to);//, function (statErr, stats) {
      const createDate = Utils.getDate(new Date( stats.birthtimeMs ));

      const from = `${dirDateFolderName(createDate, fromPath)}/${file}`;
      
      //4. 파일 복사
      fs.copySync(to, from); //{clobber : true}, function (ncpErr) {

      //if (ncpErr) return console.error(ncpErr);
      //5. 잔여 폴더 파일 삭제
      removeFileNFolder(to, stats);
 
    });
    
  } catch(e) {
    console.log(e);
  }
}

const dirDateFolderName = (date, from) => {
//
  //const date = Utils.getDate(_date);
  const ymd = Utils.convertYMD(date);
  const dirPath = `${from}/${ymd}`;
  
  fs.mkdir( dirPath, { recursive: true } );

  return dirPath;
  
}

const removeFileNFolder = async (target, stats) => {
  
  console.log(target);
  //fs.removeSync(target);//, (err) =>{
  
  if ( fs.existsSync(target) ) {
    fs.removeSync(target);
  }

}
