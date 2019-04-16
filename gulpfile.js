var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass()).on('error', onError)
    .pipe(gulp.dest('app/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/views/**/*.html', browserSync.reload); 
  gulp.watch('app/scripts/**/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      middleware: function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            //req.setHeader('Access-Control-Request-Headers', 'x-requested-with');
            next();
        }
    },
  })
});

function onError(err) {
  console.log(err);
  this.emit('end');
}

