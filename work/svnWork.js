/**
 * SVN의 최신 정보를 받아와 war로 반환한다.
 *  - maven 빌드 환경이 구축되어야 가능하다.....................
 */
const GlobalConfig = require('../config.js');
const { exec, execSync } = require("child_process");

const fs = require("fs-extra");

var svnUrl = 'http://10.1.73.15:18080/svn/xeus-smartcity/xeus-smartcity-seoul-police/public/xeus-seoul-police-public/';
var targetDir = 'D:/work';

var command = `svn checkout ${svnUrl} ${targetDir}`;

const initWorkDir = () => {
    //폴더
    if ( fs.emptyDirSync(targetDir) ) {
        fs.removeSync(targetDir);
        console.log('123');
        fs.mkdirSync(targetDir);
    }
}

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

const execMavenBuild = () => {
    execSync('batt.bat d:/work', {stdio: 'inherit'}, (error, stdout, stderr) => {

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

//initWorkDir();
//execSvnCheckOut();
execMavenBuild();




