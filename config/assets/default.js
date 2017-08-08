'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
        // endbower

        // New
        'public/lib/bootstrap/css/bootstrap.min.css',
        'public/lib/dist/css/AdminLTE.min.css',
        'public/lib/dist/css/skins/_all-skins.min.css',
        'public/lib/plugins/iCheck/flat/blue.css',
        'public/lib/plugins/morris/morris.css',
        'public/lib/plugins/jvectormap/jquery-jvectormap-1.2.2.css',
        'public/lib/plugins/datepicker/datepicker3.css',
        'public/lib/plugins/daterangepicker/daterangepicker.css',
        'public/lib/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
        //
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        // endbower

        // New
        'public/lib/plugins/jQuery/jquery-2.2.3.min.js',
        'public/lib/plugins/jQuery/jquery-ui.min.js',
        'public/lib/bootstrap/js/bootstrap.min.js',
        'public/lib/plugins/jQuery/raphael-min.js',
        // 'public/lib/plugins/morris/morris.min.js',
        'public/lib/plugins/sparkline/jquery.sparkline.min.js',
        'public/lib/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
        'public/lib/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
        'public/lib/plugins/knob/jquery.knob.js',
        'public/lib/plugins/jQuery/moment.min.js',
        'public/lib/plugins/daterangepicker/daterangepicker.js',
        'public/lib/plugins/datepicker/bootstrap-datepicker.js',
        'public/lib/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js',
        'public/lib/plugins/slimScroll/jquery.slimscroll.min.js',
        'public/lib/plugins/fastclick/fastclick.js',
        'public/lib/dist/js/app.min.js',
        // 'public/lib/dist/js/pages/dashboard.js',
        'public/lib/dist/js/demo.js'
        //

      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/{css,less,scss}/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
