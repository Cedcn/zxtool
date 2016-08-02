
const deploy = require('shipit-deploy');

module.exports = shipit => {
  deploy(shipit);
  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '~/zxtool',
      repositoryUrl: 'git@github.com:Cedcn/lazyload-qiniu.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      shallowClone: true,
    },
    staging: {
      servers: 'www@cedcn.com',
    },
  });

  shipit.task('pwd', () => shipit.remote('pwd'));
};
