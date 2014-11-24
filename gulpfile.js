var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['build-dev'], function() {
});

gulp.task('build', ['vendor', 'deploy-html', 'deploy-assets'], function() {
	gulp.src('src/app/assets/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/webroot/css'));
});

gulp.task('build-dev', ['vendor', 'deploy-html', 'deploy-assets'], function() {
	gulp.src('src/app/assets/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('build/webroot/css'));
});

gulp.task('deploy-html', function() {
	gulp.src('src/app/html/*.html')
		.pipe(gulp.dest('build/webroot'));
});

gulp.task('deploy-assets', function() {
	gulp.src('src/app/assets/images/**')
		.pipe(gulp.dest('build/images'));

	gulp.src('src/app/assets/fonts/**')
		.pipe(gulp.dest('build/fonts'));

	gulp.src('src/app/assets/js/**')
		.pipe(gulp.dest('build/js'));
});

gulp.task('vendor', ['vendor-bootstrap']);

gulp.task('vendor-bootstrap', function() {
	gulp.src('vendor/bootstrap-sass-3.3.1/assets/fonts/**')
		.pipe(gulp.dest('build/webroot/fonts'));

	gulp.src('vendor/bootstrap-sass-3.3.1/assets/images/**')
		.pipe(gulp.dest('build/webroot/images'));

	gulp.src('vendor/bootstrap-sass-3.3.1/assets/javascripts/**')
		.pipe(gulp.dest('build/webroot/js'));
});