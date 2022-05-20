const Service = require('node-windows').Service;
const dir = require('path').join(process.cwd(), '/work/fileWork.js')

const params = process.argv.slice(2);

const serviceCmd = params[0];

const errMsg = (err) => {
    console.log(`명령어가 잘못되었습니다. ${process.argv} => npm service install||uninstall 또는 node-windows 를 참고해주세요. `);
    console.log(err);
}

// Create a new service object
const svc = new Service({
  name:'NODEHJ_FileWork',
  description: 'node.js 파일 전송 서비스',
  script: dir,
  env:{
    name: "NODE_ENV",
    value: "production"
  },
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

svc.on('uninstall', (e) => {
    console.log(e);
    console.log('The service exists: ',svc.exists);
});
svc.on('start',function(e){
    console.log("start" + e);
})
svc.on('install',function(e){
    console.log(e);
    svc.start();
});

try {
    if ( serviceCmd ) {
        svc[params[0]]();
    } else {
        errMsg('명령어 없음.');
    }
} catch(e) {
    errMsg(e);
}

