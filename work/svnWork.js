/**
 * SVN의 최신 정보를 받아와 war로 반환한다.
 *  - maven 빌드 환경이 구축되어야 가능하다.....................
 */
const GlobalConfig = require('../config.js');

const cron = require('node-cron');
const fileMoveWork = require('../modules/file/fileMove.js');
const { execSync } = require("child_process");

const fs = require("fs-extra");

const svnUrl = GlobalConfig.svn.url;
const targetDir = GlobalConfig.local.targetDir;

const command = `svn checkout ${svnUrl} ${targetDir}`;

//1. 대상 폴더 초기화 ( svn -> local)
const initWorkDir = () => {
    //폴더
    if ( fs.emptyDirSync(targetDir) ) {
        fs.removeSync(targetDir);
        fs.mkdirSync(targetDir);
    }
}

//2. SVN 최신 소스 내려 받기
const execSvnCheckOut = () => {
    execSync(command, {stdio: 'inherit'}, (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
    });
}

//3. 프로젝트 maven Build
const execMavenBuild = () => {
    execSync(GlobalConfig.maven.cmd, {stdio: 'inherit'}, (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
    });
}

//4. 톰캣 서비스 재구동
const execTomcatServiceRestart = () => {
    
    //fs.removeSync(GlobalConfig.server.removeTargetDir);
  
    execSync(`net stop ${GlobalConfig.server.serviceName}`, {stdio: 'inherit'}, (error, stdout, stderr) => {
    
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    
        console.log(`stdout: ${stdout}`);
		    
		fileMoveWork(GlobalConfig.local.targetDir+'/target/xeus-1.0.0.war', GlobalConfig.file.targetDir, true);

    });
    
    execSync(`net start ${GlobalConfig.server.serviceName}`, {stdio: 'inherit'}, (error, stdout, stderr) => {
    
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    
        console.log(`stdout: ${stdout}`);
    });
}

const work  = () => {

    //1. 워크 테이블 초기화
    //initWorkDir();

    //2. svn 체크 아웃
    //execSvnCheckOut();

    //3. maven Build
    //execMavenBuild();

    //4. cmd 실행(원격지 서버에서.)
    execTomcatServiceRestart();

}

work();

//초 분 시 월 머시기 요일
cron.schedule('* */1 * * *', function(){
    console.log('패치.');
    work();
});