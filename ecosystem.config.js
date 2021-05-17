module.exports = {
  apps: [
    {
      name: "coachsome-nuxt-client",
      exec_mode: "cluster",
      instances: "max",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
        PORT: "8061"
      }
    }
  ]
};
