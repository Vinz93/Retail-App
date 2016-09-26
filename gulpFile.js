var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

var paths = {
  js: ["routes/*.js",
      "models/*.js"]
}

/* ======== Watch files & reloads the server ========  */

gulp.task('watch', ['nodemon'],function () {
  gulp.watch(paths.js,['nodemon']);

});


/* ======== Spin up a Server ========  */

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('nodemon', function () {
  nodemon({
       script: 'bin/www',
        ext: 'html js',
        watch: [paths.js],
      })
        .on('restart', function () {
          console.log('server restarted!')
        })
})
gulp.task('default',['watch']);
