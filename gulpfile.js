var gulp         = require('gulp'),
	sass         = require('gulp-ruby-sass'),
	minifyCss    = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	watch        = require('gulp-watch'),
	clean        = require('gulp-clean'),
	favicons     = require('favicons');

gulp.task('default', ['build-dev', 'watch']);

gulp.task('watch', function() {
	gulp.watch('src/**', ['build-dev']);
});

gulp.task('build', ['clean', 'vendor', 'deploy-html', 'deploy-assets'], function() {
	gulp.src('src/app/assets/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest('build/webroot/css'));
});

gulp.task('build-dev', ['clean', 'vendor', 'deploy-html', 'deploy-assets'], function() {
	gulp.src('src/app/assets/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('build/webroot/css'));
});

gulp.task('clean', function () {  
	// gulp.src('build', {read: false})
	//  	.pipe(clean());
});

gulp.task('deploy-html', function() {
	gulp.src('src/app/html/*.html')
		.pipe(gulp.dest('build/webroot'));
});

gulp.task('deploy-assets', function() {
	gulp.src('src/app/assets/images/**')
		.pipe(gulp.dest('build/webroot/images'));

	gulp.src('src/app/assets/fonts/**')
		.pipe(gulp.dest('build/webroot/fonts'));

	gulp.src('src/app/assets/js/**')
		.pipe(gulp.dest('build/webroot/js'));

	gulp.src('src/app/assets/webroot/**')
		.pipe(gulp.dest('build/webroot'));
});

gulp.task('vendor', ['vendor-bootstrap', 'vendor-jquery']);

gulp.task('vendor-bootstrap', function() {
	// Bootstrap
	gulp.src('vendor/bootstrap-sass-3.3.1/assets/fonts/**')
		.pipe(gulp.dest('build/webroot/fonts'));

	gulp.src('vendor/bootstrap-sass-3.3.1/assets/images/**')
		.pipe(gulp.dest('build/webroot/images'));

	gulp.src('vendor/bootstrap-sass-3.3.1/assets/javascripts/**')
		.pipe(gulp.dest('build/webroot/js'));

	// Font awesome
	gulp.src('vendor/font-awesome-4.2.0/fonts/**')
		.pipe(gulp.dest('build/webroot/fonts'));
});

gulp.task('vendor-jquery', function() {
	gulp.src('vendor/jquery-2.1.1/assets/js/**')
		.pipe(gulp.dest('build/webroot/js'));
});