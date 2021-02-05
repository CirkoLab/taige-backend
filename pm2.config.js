module.exports = {
	apps: [
    {
      name: 'vote',
      script: './dist/main.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        NO_COLOR: 1,
        APP_ENV: 'production',
        APP_PORT: 4000
      },
      instances: 'max',
      exec_mode: 'cluster',
      source_map_support: true,
      max_memory_restart: '2G',
      ignore_watch: ['[/\\]./', 'node_modules'],
      error_file: 'error.log',
      out_file: 'out.log'
    }
  ] 
}
