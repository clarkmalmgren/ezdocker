(function() {
  'use strict';

  var del = require('del'),
      gulp = require('gulp'),
      jspm = require('gulp-jspm'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps');

  gulp.task('clean', function(cb) {
    del(['build'], cb);
  });

  gulp.task('dist-clean', function(cb) {
    del(['dist'], cb);
  });

  gulp.task('build', function() {
    return gulp.src('src/index.js')
      .pipe(sourcemaps.init())
      .pipe(jspm({
        arithmetic: '- common_dependencies'
      }))
      .pipe(rename('ezdocker.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
  });

})();