module.exports = function (grunt) {

  // Configuration de cada plugin
  grunt.initConfig({

    clean: {
      //apaga arquivos
      all: ['dist/'],
      temp: ['dist/js/libs.js', 'dist/js/ngmin.js', 'dist/js/scriptsConcat.js']

    },
    //Valida arquivos JS 
    jshint: {
      dist: {
        src: ['public/js/**/*.js']
      }

    },

    ngmin: {
      services: {
        files: [{
          expand: true,
          cwd: 'public/js/services',
          src: '*.js',
          dest: 'dist/js/scriptsServices'
        }]
      },
      controllers: {
        files: [{
          expand: true,
          cwd: 'public/js/controllers',
          src: '*.js',
          dest: 'dist/js/scriptsControllers'
        }]
      },
      main: {
        files: [{
          expand: true,
          cwd: 'public/js',
          src: 'main.js',
          dest: 'dist/js/scriptsMain'
        }]
      },
      config: {
        files: [{
          expand: true,
          cwd: 'public/js',
          src: 'config-value.js',
          dest: 'dist/js/scriptsConfig-value'
        }]
      }
    },
    /*  ngmin: {
      angular: {
            src : ['dist/js/scriptsConcat.js'],
            dest : 'dist/js/ngmin.js'
        }*/

    //Concatena todos os arquivos js em "SCRIPTS.JS"
    concat: {
      //Sub task Script
      scripts: {
        src: [
          'dist/js/scriptsMain/main.js',
          'dist/js/scriptsConfig-value/config-value.js',
          'dist/js/scriptsServices/*.js',
          'dist/js/scriptsControllers/*.js'
        ],
        dest: 'dist/js/scriptsConcat.js'

      },
      libs: {
        src: [
          'public/plugins/jQuery/jquery-2.2.3.min.js',
          'public/plugins/jquery-ui.min.js',
          'public/vendor/bootstrap/dist/js/bootstrap.min.js',
          'public/pluMinificagins/raphael-min2.1.0.js',
          'public/plugins/sparkline/jquery.sparkline.min.js',
          'public/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
          'public/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
          'public/plugins/knob/jquery.knob.js',
          'public/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js',
          'public/plugins/slimScroll/jquery.slimscroll.min.js',
          'public/plugins/fastclick/fastclick.js',
          'public/dist/js/app.min.js',
          'public/vendor/angular/angular.min.js',
          'public/vendor/angular-route/angular-route.js',
          'public/vendor/angular-resource/angular-resource.js',
          'public/vendor/angular-ui-router/release/angular-ui-router.js',
          'public/vendor/angular-animate/angular-animate.min.js',
          'public/vendor/angular-sanitize/angular-sanitize.min.js',
          'public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'public/vendor/angular-ui-mask/dist/mask.min.js',
          'public/vendor/ng-file-upload/ng-file-upload.min.js',
          "public/vendor/angular-loading-bar/src/loading-bar.js",
          "public/vendor/angularjs-datepicker/dist/angular-datepicker.js",
        ],
        dest: 'dist/js/libs.js'
      }
    },

    //Uglify Minifica os arquivos (Remove espacos,commentarios e renomeia variaveis) 
    uglify: {

       options: {
             report: 'min',
             mangle: false
         },

      scripts: {
        src: ['dist/js/scriptsConcat.js'],
        dest: '/dist/js/scripts.min.js'
      },
      libs: {
        src: ['dist/js/libs.js'],
        dest: '/dist/js/libs.min.js'
      }
    },

    //CSSmin Minifica os arquivos (Remove espacos,commentarios)
    cssmin: {
      all: {

        src: [
          'public/vendor/bootstrap/dist/css/bootstrap.css',
          'public/css/_all-skins.min.css',
          'public/css/AdminLTE.css',
          'public/vendor/angularjs-datepicker/dist/angular-datepicker.css',
          'public/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css',
          'public/css/style.css',
          'public/css/loading-bar.css'
        ],
        dest: '/dist/css/styles.min.css'
      }
    },

    htmlmin: {
      options: {                                 // Target options 
        removeComments: true,
        collapseWhitespace: true
      },
      views: {
        expand: true,
        cwd: 'public/partials',
        src: ['*.html'],
        dest: '/dist/partials'
      }
    },

    copy: {
      index: {
        src: 'public/index-prod.html',
        dest: '/dist/index.html'
      },
      all: {
        src: ['public/favicon.ico'],
        dest: '/dist/favicon.ico'
      },
      img: {
        expand: true,
        cwd: 'public/img',
        src: ['*'],
        dest: '/dist/img/'
      },
      fonts: {
        expand: true,
        cwd: 'public/vendor/bootstrap/dist/fonts/',
        src: ['*'],
        dest: '/dist/fonts'
      },

      api: {
        src: 'api/**/*',
        dest: '/'
      },

      config: {
        src: ['config/passport.js','config/database.js'],
        dest: '/'
      },

      express: {
        src: ['config/express-prod.js'],
        dest: '/config/express.js'
      },

      serve: {
        src: ['server-prod.js'],
        dest: '/server.js'
      },

      root: {
        src: [
             '.gitignore',
             'package.json',
             'jsconfig.json'],
        dest: '/'
      },
       tmp: {
        src: 'public/tmp',
        dest: '/dist/tmp'
      },
     
    }


  });





  // Load the plugin that provides the 'uglify' task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //Verifica erros nos arquivos js 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ngmin');

  // Roda todas as Tarefas 
  //Workflow de tarefas(passo a passo)    
  grunt.registerTask('prod', ['clean:all', 'ngmin', 'concat:scripts', 'concat:libs', 'uglify', 'cssmin', 'htmlmin', 'copy', 'clean:temp']);

};
