const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name:'NODE_SVN_CHECKOUT_NEW_PLATFORM',
  description: '신규 통합플랫폼 프로젝트',
  script: 'C:/AP-NODE-SERVICE/node-svnwork/work/svnWork.js',                                //실행 메인 서버 스크립트 경로

  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.

svc.install();