'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	var files = ['Gruntfile.js', 'index.js'],
		testFiles = ['test/test-*.js'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: ['node_modules/**']
			},
			// jshint camelcase: false
			// jscs:disable
			uses_defaults: files
		},

		jscs: {
			// jshint camelcase: false
			// jscs:disable
			uses_defaults: files
		},

		env: {
			test: {
				NODE_ENV: 'test'
			}
		},

		mochaTest: {
			src: testFiles,
			options: {
				reporter: 'spec',
				require: ['index.js', 'should']
			}
		}
	});

	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'jscs', 'env:test', 'mochaTest']);
};
