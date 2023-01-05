const ftp = require("basic-ftp");

module.exports = ftpUpload = async (opt) => {
 
	const client = new ftp.Client();
  	client.ftp.verbose = true; // 자세한 통신과정을 보고 싶으면 true, 생략하고 싶으면 false로 설정하면 된다.
  	try{
      await client.access({
        host: opt.host,
      	user: opt.user,
        password: opt.password,
      });
      await client.cd(opt.serverDir);
      if ( opt.deleteDir ) await client.unlinkSync(opt.deleteDir);
      await client.uploadFrom(opt.orgDir, opt.targetDir);
    } catch (err){
      console.log(err);
      client.close();
      return false;
    }
  
  	client.close();
  	return true;
}

