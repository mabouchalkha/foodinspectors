module.exports = {

  build_dir: 'build',

  app_files: {
    // source, but NO specs
    js: [ 'src/app/**/*.js', '!src/app/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.tpl.html' ],
    // the index.html
    html: [ 'src/index.html' ]
  },

  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js'
    ]
  }
};