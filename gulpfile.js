(function() {
  'use strict';

  var del = require('del'),
      gulp = require('gulp'),
      jspm = require('gulp-jspm'),
      babel = require('gulp-babel'),
      mocha = require('gulp-mocha'),
      sourcemaps = require('gulp-sourcemaps');

  gulp.task('clean', function() {
    return del(['build']);
  });

  gulp.task('dist-clean', function() {
    return del(['dist']);
  });

  gulp.task('build', function() {
    return gulp.src(['src/ezdocker.js', 'src/tar-utils.js'])
      .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
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