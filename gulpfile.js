var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['build-dev'], function() {
});

gulp.task('build-dev', function() {
	gulp.src('src/app/assets/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/webroot/assets/css'));
});

gulp.task('build-dev', ['vendor'], function() {
	gulp.src('src/app/assets/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('build/webroot/assets/css'));
});

gulp.task('vendor', ['vendor-bootstrap']);

gulp.task('vendor-bootstrap', function() {
	gulp.src('vendor/bootstrap-sass-3.3.1/assets/fonts/**')
		.pipe(gulp.dest('build/webroot/assets/fonts'));

	gulp.src('vendor/bootstrap-sass-3.3.1/assets/images/**')
		.pipe(gulp.dest('build/webroot/assets/images'));

	gulp.src('vendor/bootstrap-sass-3.3.1/assets/javascripts/**')
		.pipe(gulp.dest('build/webroot/assets/js'));
});