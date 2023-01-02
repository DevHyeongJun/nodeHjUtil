const Utils = require('../../util/Utils.js');

const fs = require("fs-extra");

module.exports = fileMoveWork = (toPath, fromPath, isDelete) => {
 
  try {
    
    if ( isDelete ) {
      removeFileNFolders(fromPath);
    }

    const to = `${toPath}`;

    const from = `${fromPath}/xeus.war`;
      
	  //파일 복사
	  fs.copySync(to, from); //{clobber : true}, function (ncpErr) {
   
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

const removeFileNFolder = async (target) => {
  
  //fs.removeSync(target);//, (err) =>{
  
  if ( fs.existsSync(target) ) {
    fs.removeSync(target);
  }

}


const removeFileNFolders = async (fromPath) => {
  
  try {
    
    //1. 목록 정보 추출
    const filelist = fs.readdirSync(fromPath);//, (err, filelist) => {

    //2. 목록 상세 정보 가져오기
    filelist.forEach(function(file) {
      if ( file !== 'ROOT') {
        const to = `${fromPath}/${file}`;
        removeFileNFolder(to);

      }
    });
    
  } catch(e) {
    console.log(e);
  }
}
