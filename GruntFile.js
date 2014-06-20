module.exports = function(grunt)
{

	grunt.initConfig({

		clean: {
			dist: {
				src: ['dist/']
			}
		},

		concat: {
			dist: {
				src: ['src/*.js'],
				dest: 'dist/wlib.min.js',
			},
		},

		uglify: {
			dist: {
				files: {
					'dist/wlib.min.js': ['src/*.js']
				}
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				globals: {
					jQuery: true
				},
			},
			uses_defaults: ['src/*.js'],
		},


		watch: {
			app_sass: {
				files: ['scss/**/*.scss', 'scss/**/*.sass'],
				tasks: ['clean:app_css','compass:app_sass', 'autoprefixer:app_css'],
			},
			jshint: {
				files: ['src/*.js'],
				tasks: ['jshint'],
			}
		}

	});



	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	//grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('verify', ['jshint']);
	grunt.registerTask('dist', ['clean:dist','concat:dist', 'uglify:dist']);

};