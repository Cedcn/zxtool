const deploy = require('shipit-deploy');
const npm = require('shipit-yarn');

module.exports = shipit => {
  deploy(shipit);
  npm(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/zxtool',
      deployTo: '~/zxtool',
      repositoryUrl: 'git@github.com:Cedcn/zxtool.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 3,
      shallowClone: true,
    },
    staging: {
      servers: 'cedcn@cedcn',
      yarn: {
        remote: true,
        installFlags: ['--production'],
      },
    },
  });

  // shipit.task('pwd', () => shipit.remote('pwd'));

  shipit.on('deployed', () => {
    const current = shipit.currentPath;
    shipit.remote(`cd ${current}; NODE_ENV=production npm run dll && npm run bulid && node ./bin/www`)
      .then(res => console.log(res[0].stdout));
  });
};
