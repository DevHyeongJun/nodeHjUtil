/**
 * SVN의 최신 정보를 받아와 war로 반환한다.
 *  - maven 빌드 환경이 구축되어야 가능하다.....................
 */
const GlobalConfig = require('../config.js');

const cron = require('node-cron');
const fileMoveWork = require('../modules/file/fileMove.js');
const { execSync } = require("child_process");

const fs = require("fs-extra");
const Util = require("../util/Utils.js");

const svnUrl = GlobalConfig.svn.url;
const targetDir = GlobalConfig.local.targetDir;

const command = `svn --username ahj --password dksgudwns1! checkout -q ${svnUrl} ${targetDir}`;

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
	Util.loggerMsg(`svn checkout start!!!!`);
    execSync(command, {stdio: 'inherit'}, (error, stdout, stderr) => {

        if (error) {
            Util.loggerMsg(error.message, 'err');
            return;
        }
        if (stderr) {
            Util.loggerMsg(stderr, 'err');
            return;
        }
		
		
      //  console.log(`stdout: ${stdout}`);
    });
	Util.loggerMsg(`svn checkout end!!!!`);
}

//3. 프로젝트 maven Build
const execMavenBuild = () => {
	Util.loggerMsg(`maven build start!!!!`);
    execSync(GlobalConfig.maven.cmd, {stdio: 'inherit'}, (error, stdout, stderr) => {

        if (error) {
            Util.loggerMsg(error.message, 'err');
            return;
        }
        if (stderr) {
            Util.loggerMsg(stderr, 'err');
            return;
        }

        
    });
	Util.loggerMsg(`maven build end!!!!`);
}

//4. 톰캣 서비스 재구동
const execTomcatServiceRestart = () => {
    Util.loggerMsg(`tomcat service start!!!!`);
    //fs.removeSync(GlobalConfig.server.removeTargetDir);
	try {
		execSync(`net stop ${GlobalConfig.server.serviceName}`, {stdio: 'inherit'}, (error, stdout, stderr) => {
    
			if (error) {
				Util.loggerMsg(error.message, 'err');
				return;
			}
			if (stderr) {
				Util.loggerMsg(stderr, 'err');
				return;
			}
		});	
	} catch(e) {
	}
		
    fileMoveWork(GlobalConfig.local.targetDir+'/target/xeus-1.0.0.war', GlobalConfig.file.targetDir, true);
	
    execSync(`net start ${GlobalConfig.server.serviceName}`, {stdio: 'inherit'}, (error, stdout, stderr) => {
    
        if (error) {
			Util.loggerMsg(error.message, 'err');
			return;
		}
		if (stderr) {
			Util.loggerMsg(stderr, 'err');
			return;
		}
    
        
    });
	
	Util.loggerMsg(`tomcat service end!!!!`);
}

const work  = () => {

    //1. 워크 테이블 초기화
    initWorkDir();

    //2. svn 체크 아웃
    execSvnCheckOut();

    //3. maven Build
    execMavenBuild();

    //4. cmd 실행(원격지 서버에서.)
    execTomcatServiceRestart();
}

work();
//0 */1 * * * 
//초 분 시 월 머시기 요일
cron.schedule('0 */1 * * *', function(){
	Util.loggerMsg('svn work run!!', 'err');
	work();
	Util.loggerMsg('svn work end!!', 'err');
});