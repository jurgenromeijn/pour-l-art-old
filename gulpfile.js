var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
	return gulp.src('src/app/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/webroot/css/styles.css'));