var gulp         = require('gulp'),
	sass         = require('gulp-ruby-sass'),
	minifyCss    = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	watch        = require('gulp-watch'),
	merge        = require('merge-stream'),
	clean        = require('gulp-clean'),
	imageop      = require('gulp-image-optimization'),
	swig         = require('gulp-swig'),
	data         = require('gulp-data'),
    connect      = require('gulp-connect'); 

var path = {
	src : {
		assets: 'src/app/assets/**',
		data: 'src/app/data/',
		data_files: 'src/app/data/**',
		fonts: 'src/app/assets/fonts/**',
		images: 'src/app/assets/images/**',
		templates: 'src/app/templates/**',
		templates_main: 'src/app/templates/*.html',
		js: 'src/app/assets/js/**',
		scss: 'src/app/assets/scss',
		scss_main: 'src/app/assets/scss/styles.scss',
		webroot: 'src/app/assets/webroot/**',
	},
	vendor : {
		all: 'bower_components/**',
		bootstrap: {
			fonts: 'bower_components/bootstrap-sass/assets/fonts/**',
			images: 'bower_components/bootstrap-sass/assets/images/**',
			js: 'bower_components/bootstrap-sass/assets/javascripts/**',
			scss: 'bower_components/bootstrap-sass/assets/stylesheets',
			root: 'bower_components/bootstrap-sass'
		},
		jquery: {
			js: 'bower_components/jquery/dist/jquery.min.js',
			root: 'bower_components/jquery'
		},
		fontawesome: {
			fonts: 'bower_components/components-font-awesome/fonts/**',
			scss: 'bower_components/components-font-awesome/scss',
			root: 'bower_components/components-font-awesome'
		}
	},
	build: {
		css: 'dist/css',
		fonts: 'dist/fonts',
		images: 'dist/images',
		js: 'dist/js',
		webroot: 'dist',
		webroot_files: 'dist/**'
	}
};

gulp.task('default', ['build-dev', 'server-connect', 'watch']);

gulp.task('watch', function() {
	gulp.watch([path.src.assets, '!' + path.src.scss], ['deploy-assets']);
	gulp.watch(path.src.scss, ['deploy-css-dev']);
	gulp.watch([path.src.templates, path.src.data_files], ['deploy-html']);
	gulp.watch(path.vendor.all, ['deploy-assets']);
	gulp.watch(path.build.webroot_files, ['server-reload']);
});

gulp.task('build', ['deploy-vendor', 'deploy-css', 'deploy-html', 'deploy-assets'], function() {
});

gulp.task('build-dev', ['deploy-vendor', 'deploy-css-dev', 'deploy-html', 'deploy-assets'], function() {
});

gulp.task('deploy-css', function() {
	return gulp.src(path.src.scss_main)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('deploy-css-dev', function() {
	return gulp.src(path.src.scss_main)
		.pipe(sass({
            loadPath: [
                path.src.scss,
                path.vendor.bootstrap.scss,
                path.vendor.fontawesome.scss
            ]
        }))
		.pipe(autoprefixer())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('clean', function () {  
	gulp.src(['build', 'tmp'], {read: false})
	  	.pipe(clean());
});

gulp.task('deploy-html', function() {
	return gulp.src(path.src.templates_main)
		.pipe(swig({
			load_json: true,
            defaults: {
                cache: false
            },
  			json_path: path.src.data,
		}))
		.pipe(gulp.dest(path.build.webroot));
});

gulp.task('deploy-assets', function() {
	return merge(
		gulp.src(path.src.images)
			.pipe(imageop({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.build.images)),

		gulp.src(path.src.fonts)
			.pipe(gulp.dest(path.build.fonts)),

		gulp.src(path.src.js)
			.pipe(gulp.dest(path.build.js)),

		gulp.src(path.src.webroot)
			.pipe(gulp.dest(path.build.webroot))
	);
});

gulp.task('deploy-vendor', ['deploy-vendor-bootstrap', 'deploy-vendor-fontawesome', 'deploy-vendor-jquery']);

gulp.task('deploy-vendor-bootstrap', function() {
	return merge(
		gulp.src(path.vendor.bootstrap.fonts)
			.pipe(gulp.dest(path.build.fonts)),

		gulp.src(path.vendor.bootstrap.images)
			.pipe(imageop({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.build.images)),

		gulp.src(path.vendor.bootstrap.js)
			.pipe(gulp.dest(path.build.js))
	);
});

gulp.task('deploy-vendor-fontawesome', function() {
	return gulp.src(path.vendor.fontawesome.fonts)
		.pipe(gulp.dest(path.build.fonts));
});


gulp.task('deploy-vendor-jquery', function() {
	return gulp.src(path.vendor.jquery.js)
		.pipe(gulp.dest(path.build.js));
});

gulp.task('server-connect', function() {
    connect.server({
        root: path.build.webroot,
        livereload: true
    });
});

gulp.task('server-reload', function(){
    gulp.src(path.build.webroot_files)
        .pipe(connect.reload());
});
