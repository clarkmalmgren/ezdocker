(function() {
  'use strict';

  var del = require('del'),
      gulp = require('gulp'),
      jspm = require('gulp-jspm'),
      babel = require('gulp-babel'),
      mocha = require('gulp-mocha'),
      sourcemaps = require('gulp-sourcemaps');

  /* Require this to ensure that mocha runs using es6 */
  require('babel-core/register');

  gulp.task('clean', function() {
    return del(['build']);
  });

  gulp.task('dist-clean', function() {
    return del(['dist']);
  });

  gulp.task('build', function() {
    return gulp.src(['src/ezdocker.js', 'src/tar-utils.js'])
      .pipe(sourcemaps.init())
        .pipe(babel())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('test', function() {
    return gulp.src('src/*.js')
      .pipe(mocha({reporter: 'nyan'}));
  });

})();