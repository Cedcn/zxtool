const deploy = require('shipit-deploy');
const npm = require('shipit-npm');

module.exports = shipit => {
  deploy(shipit);
  npm(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/zxtool',
      deployTo: '~/zxtool',
      repositoryUrl: 'git@git.coding.net:cedcn/zxtool.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 3,
      shallowClone: true,
    },
    staging: {
      servers: 'www@cedcn.com',
      npm: {
        remote: true,
        installFlags: ['--production'],
      },
    },
  });

  shipit.task('pwd', () => shipit.remote('pwd'));
};
