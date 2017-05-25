var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
//var util = require( 'gulp-util' )
var ngAnnotate = require('gulp-ng-annotate')
var imagemin = require('gulp-imagemin')

var fs = require('fs')

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
	require('./gulp/' + task)
})

gulp.task('js', function () {
	gulp.src(['ng/module.js', 'ng/**/*.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			.pipe(ngAnnotate())
			.pipe(uglify())
			//.pipe(uglify().on('error',util.log))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets'))
})

gulp.task('img', function () {
	gulp.src('img/*')
		.pipe(imagemin({optimiationLevel: 5, progressive: true, interlaced: true}))
		.pipe(gulp.dest('assets/img'));
})

gulp.task('watch:js', ['js'], function () {
	gulp.watch('ng/**/*.js', ['js'])
})

gulp.task('watch:css', ['css'], function () {
	gulp.watch('css/**/*.styl', ['css'])
})

gulp.task('watch:img', ['img'], function () {
	gulp.watch('img/**/*.jpg', ['img'])
})

gulp.task('dev', ['watch:css', 'watch:js', 'watch:img', 'dev:server'])