const gulp = require('gulp');
// const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('js', () => {
  return gulp.src('phaser/sourcecode/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('phaser/static/js/'))
})

// gulp.task('sass', () => {
//   return gulp.src('phaser/sourcecode/css/*.scss')
//     .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
//     .pipe(gulp.dest('phaser/static/css/'))
// })

// gulp.task('default', ['sass','js'], () => {
//   gulp.watch('phaser/sourcecode', ['sass','js']);
// })
gulp.task('default', ['js'], () => {
  gulp.watch('phaser/sourcecode/js/*.js', ['js']);
})