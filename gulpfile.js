(function() {
  'use strict';

  var del = require('del'),
    gulp = require('gulp'),
    jspm = require('gulp-jspm'),
    babel = require('gulp-babel'),
    esdoc = require('gulp-esdoc'),
    mocha = require('gulp-mocha'),
    plumber = require('gulp-plumber'),
    istanbul = require('gulp-istanbul'),
    coveralls = require('gulp-coveralls'),
    sourcemaps = require('gulp-sourcemaps');

  gulp.task('clean', function() {
    return del(['build']);
  });

  gulp.task('dist-clean', ['clean'], function() {
    return del(['dist', 'dist_test']);
  });

  gulp.task('build', function() {
    return gulp.src(['src/*.js'])
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('esdoc', function() {
    return gulp.src(['src'])
      .pipe(esdoc({ destination: './build/esdoc' }));
  });

  gulp.task('test:build', function() {
    return gulp.src(['test/*.js'])
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist_test'));
  });

  gulp.task('test:instrument', ['build', 'test:build'], function() {
    return gulp.src(['dist/*.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire());
  });

  gulp.task('test', ['test:instrument'], function() {
    return gulp.src('dist_test/*.js')
      .pipe(mocha())
      .pipe(istanbul.writeReports({
        dir: './build/coverage',
        reporters: ['lcovonly', 'html', 'text-summary']
      }));
  });

  gulp.task('ci', [ 'test' ], function() {
    return gulp.src('build/coverage/lcov.info')
      .pipe(plumber())
      .pipe(coveralls())
      .pipe(plumber.stop());
  });

})();
