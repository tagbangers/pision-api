module.exports = {
  apps: [
    {
      name: "pision-api",
      script: "app.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "one two",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "ec2-user",
      host: "ec2-3-113-22-35.ap-northeast-1.compute.amazonaws.com",
      key: "~/.ssh/pision-tagbangers.pem",
      ref: "origin/master",
      repo: "git@github.com:tagbangers/pision-api.git",
      ssh_options: "StrictHostKeyChecking=no",
      path: "/home/ec2-user/pision-api",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
