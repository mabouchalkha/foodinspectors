module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-html2js');

  var userConfig = require('./build.config.js');

  var taskConfig = {
  	pkg: grunt.file.readJSON('package.json'),

  		watch: {
				options: {
				  livereload: true,
				},
				jssrc: {
					files: [
						'<%= app_files.js %>'
					],
					tasks: ['copy', 'index']
				},
				html: {
					files: [ '<%= app_files.html %>' ],
					tasks: [ 'index:build' ]
				},
				less: {
					files: 'src/less/**/*.less',
					tasks: ['less:build']
				},
				modules: {
					files: 'src/modules/**/*.js',
					tasks: ['browserify']
				},
				gruntfile: {
				 files: 'Gruntfile.js',
				 tasks: [],
				 options: {
				 	livereload: false
				 }
				}
			},
			concurrent: {
				dev: {
				   tasks: ['nodemon:dev', 'watch'],
				   options: {
				      logConcurrentOutput: true
					} 
				}
			},
			html2js: {
				/*
	      	* These are the templates from `src/app`.
	      */
		  	app: {
		      options: {
		          base: 'src/app'
		      },
		      src: [ '<%= app_files.atpl %>' ],
		      dest: '<%= build_dir %>/templates-app.js'
				}
			},
			less: {
		   	build: {
		     	files: {
		      	'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/less/main.less'
		      }
				} 
			},
			browserify: {
      	build: {
        	src: ['src/modules/modules.js'],
        	dest: '<%= build_dir %>/bundle.js',
        	options: {
						debug: true 
					},
				aliasMappings: [
	         	{
	            cwd: 'src/modules/',
	            src: ['**/*.js', '!**/*.spec.js'],
	            dest: 'modules/'
	         	}
        	]
        }
			},
			index: {
			 	build: {
			   	dir: '<%= build_dir %>',
			  	src: [
			      '<%= vendor_files.js %>',
			      '<%= build_dir %>/src/**/*.js',
			      '<%= html2js.app.dest %>',
			      '<%= build_dir %>/bundle.js',
			      '<%= build_dir %>/assets/**/*.css'
					] 
				}
			},
			clean: [
				'<%= build_dir %>'
			],
			copy: {
		   	appjs: {
					files: [ 
						{
			        src: [ '<%= app_files.js %>' ],
			        dest: '<%= build_dir %>/',
			        cwd: '.',
			        expand: true
						} 
					]
				},
				vendorjs: {
        	files: [
	         	{
	            src: [ '<%= vendor_files.js %>' ],
	            dest: '<%= build_dir %>/',
	            cwd: '.',
	            expand: true
	         	}
        	]
      	} 
			}
  	};

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  
	grunt.registerTask('default', ['build', 'concurrent']);

	grunt.registerTask('build', ['clean', 'copy', 'html2js', 'browserify', 'less', 'index']);



	function filterForExtension(extension, files) {
  	var regex = new RegExp('\\.' + extension + '$');
  	var dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');

  	return files.filter(function (file) {
   	return file.match(regex);
  	}).map(function (file) {
   	return file.replace(dirRE, '');
  	});
	}

	grunt.registerMultiTask('index', 'Process index.html template', function () {
		var dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');

		var jsFiles = filterForExtension('js', this.filesSrc);
		var cssFiles = filterForExtension('css', this.filesSrc);

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
			process: function (contents, path) {
			   return grunt.template.process(contents, {
			      data: {
			        scripts: jsFiles,
			        styles: cssFiles,
			        version: grunt.config('pkg.version')
			      }
				}); 
			}
		});
	});
};