'use-strict'

var gulp = require('gulp'),
  less = require('gulp-less'),
  livereload = require('gulp-livereload'),
  watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server'),
    jade = require('gulp-jade');

//server
gulp.task('server', function() {

  var server = gls.static('app', 8888);
  server.start();

  gulp.watch(['./app/css/*.css', './app/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
 
});

//html
gulp.task('html', function() {
  gulp.src('./app/*.html')
  .pipe(livereload());
});

//less
gulp.task('less', function() {
  gulp.src('./app/less/main.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(livereload());
});


gulp.task('jade', function(){
  gulp.src('./app/jade/*.jade')
    .pipe(jade({
        pretty: true
    })).on("error", console.log)
    .pipe(gulp.dest('./app'))
    .pipe(livereload());
});


//watch
gulp.task('watch', function() {
    gulp.watch('./app/less/*.less', ['less']);
    //gulp.watch('./app/jade/*.jade', ['jade']);
    //gulp.watch('./app/jade/inc/*.jade', ['jade']);
    //gulp.watch('./app/jade/mixins/*.jade', ['jade']);
});

//default
gulp.task('default', ['server', 'html', 'less', 'watch']);