module.exports = {

  build_dir: 'build',

  app_files: {
    // source, but NO specs
    js: [ 'src/app/**/*.js', '!src/app/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.tpl.html' ],
    // the index.html
    html: [ 'src/index.html' ],
    // fonts
    fonts: ['fonts/**'],
    //json locale i18n
    json: ['src/**/*.json']
  },
  common_files: {
    js: [ 'src/common/**/*.js']
  },
  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-messages/angular-messages.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-aria/angular-aria.js',
      'vendor/angular-cookies/angular-cookies.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-translate/angular-translate.js',
      'vendor/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'vendor/restangular/dist/restangular.js',
      'vendor/angular-toastr/dist/angular-toastr.js',
      'vendor/lodash/dist/lodash.js',
      'vendor/jquery/dist/jquery.js',
      'vendor/jquery.slimscroll/jquery.slimscroll.js',
      'vendor/bootstrap/dist/js/bootstrap.js'
    ]
  }
};