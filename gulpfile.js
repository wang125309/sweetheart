var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var base64 = require('gulp-base64');
var css_minify = require('gulp-minify-css');
var browserify = require('gulp-browserify');

gulp.task('lint',function(){
    gulp.src('./static/js-modify/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('stylus',function(){
    gulp.src('./static/css-modify/*.styl')
        .pipe(stylus())
        .pipe(css_minify())
        .pipe(base64())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('stylus-portal',function(){
    gulp.src('./static/css-modify/portal/*.styl')
        .pipe(stylus())
        .pipe(css_minify())
        .pipe(base64())
        .pipe(gulp.dest('./static/css/portal'));
});

gulp.task('js-only',function(){
        gulp.src('./static/js-modify/coach.js')
			.pipe(browserify())
			.pipe(concat('.js'))
            .pipe(gulp.dest('./static/js'))
            .pipe(rename('coach.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./static/js'));
});
var js_files = ['login','coach','user','subject','position','course','check','wx','backuser','shop'];

gulp.task('js',function(){
    for (i in js_files) {
        gulp.src('./static/js-modify/'+js_files[i]+'.js')
			.pipe(browserify())
			.pipe(concat('.js'))
            .pipe(gulp.dest('./static/js'))
            .pipe(rename(js_files[i]+'.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./static/js'));    
    }
});


gulp.task('js-portal',function(){
    gulp.src('./static/js-modify/portal/newcourse.js')
        .pipe(browserify())
        .pipe(gulp.dest('./static/js/portal/'))
        .pipe(uglify())
});

gulp.task('jade',function(){
    gulp.src('./template/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./template/'))
});

gulp.task('jade-portal',function(){
    gulp.src('./template/jade/portal/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./template/portal/'))
});

