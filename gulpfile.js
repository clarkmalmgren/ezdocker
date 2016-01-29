(function() {
  'use strict';

  var del = require('del'),
      gulp = require('gulp'),
      jspm = require('gulp-jspm'),
      mocha = require('gulp-mocha'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps');

  gulp.task('clean', function() {
    return del(['build']);
  });

  gulp.task('dist-clean', function() {
    return del(['dist']);
  });

  gulp.task('build', function() {
    return gulp.src('src/index.js')
      .pipe(sourcemaps.init())
      .pipe(jspm({
        //arithmetic: '- common_dependencies',
        selfExecutingBundle: true
      }))
      .pipe(rename('ezdocker.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build-tests', function() {
    return gulp.src('src/index.spec.js')
      .pipe(sourcemaps.init())
      .pipe(jspm({selfExecutingBundle: true}))
      .pipe(rename('test.bundle.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build'));
  });



  gulp.task('test', ['build-tests'], function() {
    return gulp.src('build/test.bundle.js')
      .pipe(mocha({reporter: 'nyan'}));
  });

})();