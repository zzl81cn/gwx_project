module.exports = {
  apps: [
    {
      name: 'API',
      <!-- 入口文件 -->
      script: 'dist/index.html',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '118.31.127.58',
      ref: 'origin/master',
      <!-- github地址 使用ssh -->
      repo: 'git@github.com:guanwanxiao/gwx_project.git',
      <!-- 存放的服务器路径 -->
      path: '/root/repo/vue',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}