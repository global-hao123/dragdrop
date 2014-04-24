var gulp = require('gulp');

var uglify = require('gulp-uglify');

var rename = require("gulp-rename");

gulp.task('build', function() {
  gulp.src('./src/**/*.js')
    .pipe(uglify({
      "output": {
        "beautify": true
      }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({
      "mangle": true
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);