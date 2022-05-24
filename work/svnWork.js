/**
 * SVN의 최신 정보를 받아와 war로 반환한다.
 * 
 */
const GlobalConfig = require('../config.js');
const svnUltimate = require('node-svn-ultimate');

/**
 * svn 체크 아웃
 */
svnUltimate.commands.export( 'http://10.1.73.15:18080/svn/xeus/openapi/', 'd:/svnWork/', ( err ) => {
    console.log(err);
    console.log( "Checkout complete" );
});