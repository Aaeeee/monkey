const gulp = require('gulp')
const sass = require('gulp-sass')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')
const cssmin = require('gulp-cssmin')
const htmlmin = require('gulp-htmlmin')

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
        port:8000,
        livereload: true,
        directoryListing: true,
        open: true
    }))
})

gulp.task('vendor', function() {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(gulp.dest('dist'))
})

gulp.task('cssmin', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('dist'))
})

gulp.task('htmlmin', function() {
    const options = {
        removeComments: true, //清除html注释
        collapseWhitespace: true, //压缩html
        minfyJS: true, //压缩js
        minfyCss: true //压缩css
    }
    return gulp.src('src/index.html').pipe(htmlmin(options))
        .pipe(gulp.dest('./'))
})

gulp.task('watch', ['vendor', 'cssmin', 'htmlmin'], function() {
	return gulp.watch('src/**', ['cssmin', 'htmlmin'])
})

gulp.task('default', ['watch', 'serve'])
