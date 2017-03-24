module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jscs: {
            options: {
                config: true,
                verbose: true
            },
            files: {
                src: ['/js/src/scheme/*.js', '/js/src/*.js']
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            files: {
                src: ['/js/src/scheme/*.js', '/js/src/*.js']
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            files: {
                src: ['/css/*.css']
            }
        },

        scsslint: {
            options: {
                config: '.scss-lint.yml'
            },
            files: {
                src: ['/css/*.scss']
            }
        },
    });
};
