	module.exports = function(grunt) {

		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-nodemon');
		grunt.loadNpmTasks('grunt-concurrent');
		grunt.loadNpmTasks('grunt-html2js');
		grunt.loadNpmTasks('grunt-browserify');
		grunt.loadNpmTasks('grunt-ng-annotate');
		grunt.loadNpmTasks('grunt-contrib-uglify'); 

	  	var userConfig = require('./build.config.js');

	  	var taskConfig = {
	  	pkg: grunt.file.readJSON('package.json'),
	  	dist_target: '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>',

	  		watch: {
					options: {
					  livereload: true,
					},
					jssrc: {
						files: [
							'<%= app_files.js %>',
							'<%= common_files.js %>'
						],
						tasks: ['copy', 'index']
					},
					html: {
						files: [ '<%= app_files.html %>' ],
						tasks: [ 'index:build' ]
					},
					template: {
	          				files: [ '<%= app_files.atpl %>' ],
						tasks: [ 'html2js' ]
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
			nodemon: {
		      dev: {
		      	script: 'cdn/server.js',
		        options: {
		          watch: ['cdn']
		        }
		      }
	    	},
			concurrent: {
				dev: {
				   tasks: ['nodemon:dev','watch'],
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
			          base: 'src/app/'
			      },
			      src: [ '<%= app_files.atpl %>' ],
			      dest: '<%= build_dir %>/templates-app.js'
				},
			},
			less: {
		   	build: {
			     	files: {
			      	'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/less/main.less'
			      }
				},
		     	dist: {
					options: {
						compress: true
					},
					files: {
						'<%= dist_target %>.css': 'src/less/main.less'
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
				},
				dist : {
			       dir: '<%= dist_dir %>',
						src: [
			          '<%= dist_dir %>/**/*.js',
			          '<%= dist_dir %>/**/*.css'
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
				commonjs: {
					files: [ 
						{
							src: [ '<%= common_files.js %>' ],
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
      		},
	      	fonts: {
		        	files: [
			         	{
				            src: [ '<%= app_files.fonts %>' ],
				            dest: '<%= build_dir %>/assets',
				            cwd: '.',
				            expand: true
			         	}
		        	]
	      	},
	      	json: {
	      		files: [
	      				{
	      					src: ['<%= app_files.json %>'],
	      					dest: '<%= build_dir %>/',
			           		cwd: '.',
			            	expand: true
	      				}
	      		]
	      	},
				img: {
					files: [
							{
								src: ['<%= app_files.img %>'],
		      				dest: '<%= build_dir %>/assets',
				            cwd: '.',
				            expand: true
							}
					]
				},
				dist: {
					files: [
							{
								src: ['<%= app_files.img %>', '<%= app_files.fonts %>', '<%= app_files.json %>' ],
		      				dest: '<%= dist_dir %>/assets',
				            cwd: '.',
				            expand: true
							}
					]
				},
				distI18n: {
					files: [
							{
								src: [ '<%= app_files.json %>' ],
		      				dest: '<%= dist_dir %>/',
				            cwd: '.',
				            expand: true
							}
					]
				}
			},
			concat: {
			  	dist_js: {
				   src: [
				   	'<%= vendor_files.js %>',
				   	'module.prefix',
				      '<%= build_dir %>/src/**/*.js',
				      '<%= build_dir %>/templates-app.js',
				      'module.suffix',
				      '<%= build_dir %>/bundle.js'
					],
			    	dest: '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
			  }
			},
		  	ngAnnotate: {
		     	compile: {
		       	files: [
			         {
			           src: [ '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js' ],
			           dest: '<%= dist_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
						} 
					]
				} 
			},
			uglify: {  
				dist: {
	       		files: {
	         		'<%= dist_target %>.js': '<%= dist_target %>.js'
					} 
				}
			}
	  	};

	  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	  
		grunt.registerTask('default', ['build', 'concurrent']);

		grunt.registerTask('build', ['clean', 'copy', 'html2js', 'browserify', 'less:build', 'index:build']);

		grunt.registerTask('heroku', ['build', 'concat', 'ngAnnotate', 'uglify', 'less:dist', 'index:dist', 'copy:dist']);


		function filterForExtension(extension, files) {
	  	var regex = new RegExp('\\.' + extension + '$');
	  	var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('dist_dir') + ')\/', 'g');
	  	            
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
