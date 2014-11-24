var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
	return gulp.src('src/app/assets/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/webroot/assets/css/styles.css'));
});