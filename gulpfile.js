var gulp         = require('gulp'),
	sass         = require('gulp-ruby-sass'),
	minifyCss    = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	watch        = require('gulp-watch');

var path = {
	src : {
		assets: 'src/app/assets/**',
		fonts: 'src/app/assets/fonts/**',
		images: 'src/app/assets/images/**',
		html: 'src/app/html/**/*.html',
		js: 'src/app/assets/js/**',
		scss: 'src/app/assets/scss/**',
		scss_main: 'src/app/assets/scss/styles.scss',
		webroot: 'src/app/assets/webroot/**',
	},
	vendor : {
		all: 'vendor/**',
		bootstrap: {
			fonts: 'vendor/bootstrap-sass-3.3.1/assets/fonts/**',
			images: 'vendor/bootstrap-sass-3.3.1/assets/images/**',
			js: 'vendor/bootstrap-sass-3.3.1/assets/javascripts/**',
			scss: 'vendor/bootstrap-sass-3.3.1/assets/stylesheets/**',
			root: 'vendor/bootstrap-sass-3.3.1'
		},
		jquery: {
			js: 'vendor/jquery-2.1.1/assets/js/**',
			root: 'vendor/jquery-2.1.1'
		},
		fontawesome: {
			fonts: 'vendor/font-awesome-4.2.0/fonts/**',
			root: 'vendor/font-awesome-4.2.0'
		}
	},
	build: {
		css: 'build/webroot/css',
		fonts: 'build/webroot/fonts',
		images: 'build/webroot/images',
		js: 'build/webroot/js',
		webroot: 'build/webroot'
	}
};

gulp.task('default', ['build-dev', 'watch']);

gulp.task('watch', function() {
	gulp.watch([path.src.assets, '!' + path.src.scss], ['deploy-assets']);
	gulp.watch(path.src.scss, ['deploy-css-dev']);
	gulp.watch(path.src.html, ['deploy-html']);
	gulp.watch(path.vendor.all, ['deploy-assets']);
});

gulp.task('build', ['clean', 'deploy-vendor', 'deploy-css', 'deploy-html', 'deploy-assets'], function() {
});

gulp.task('build-dev', ['clean', 'deploy-vendor', 'deploy-css-dev', 'deploy-html', 'deploy-assets'], function() {
});

gulp.task('deploy-css', function() {
	gulp.src(path.src.scss_main)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('deploy-css-dev', function() {
	gulp.src(path.src.scss_main)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('clean', function () {  
	// gulp.src('build', {read: false})
	//  	.pipe(clean());
});

gulp.task('deploy-html', function() {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.webroot));
});

gulp.task('deploy-assets', function() {
	gulp.src(path.src.images)
		.pipe(gulp.dest(path.build.images));

	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));

	gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js));

	gulp.src(path.src.webroot)
		.pipe(gulp.dest(path.build.webroot));
});

gulp.task('deploy-vendor', ['deploy-vendor-bootstrap', 'deploy-vendor-fontawesome', 'deploy-vendor-jquery']);

gulp.task('deploy-vendor-bootstrap', function() {
	// Bootstrap
	gulp.src(path.vendor.bootstrap.fonts)
		.pipe(gulp.dest(path.build.fonts));

	gulp.src(path.vendor.bootstrap.images)
		.pipe(gulp.dest(path.build.images));

	gulp.src(path.vendor.bootstrap.js)
		.pipe(gulp.dest(path.build.js));
});

gulp.task('deploy-vendor-fontawesome', function() {
	gulp.src(path.vendor.fontawesome.fonts)
		.pipe(gulp.dest(path.build.fonts));
});


gulp.task('deploy-vendor-jquery', function() {
	gulp.src(path.vendor.jquery.js)
		.pipe(gulp.dest(path.build.js));
});