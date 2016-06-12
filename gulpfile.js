var gulp = require ('gulp');
var sass = require ('gulp-sass');
var browserSync = require ('browser-sync').create();
var useref = require ('gulp-useref');
var uglify = require ('gulp-uglify');
var gulpIf = require ('gulp-if');
var cssnano = require ('gulp-cssnano');
var imagemin = require ('gulp-imagemin');
var cache = require ('gulp-cache');
var del = require ('del');
var runSequence = require ('run-sequence');

gulp.task('browserSync', function (){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('sass', function (){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/css/**/*.css', browserSync.reload);
});

gulp.task('useref', function (){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulp.dest('publish'))
});

gulp.task('useref', function (){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify ()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('publish'))
});

gulp.task('images', function (){
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('publish/images'))
});

gulp.task('fonts', function (){
	return gulp.src('app/css/fonts/**/*.tiff')
	.pipe(gulp.dest('publish/css/fonts'))
});

gulp.task('clean:publish', function (){
	return del.sync('publish');
});

gulp.task('build', function (callback){
	runSequence('clean:publish',
		['sass', 'useref', 'images', 'fonts'],
		callback)
});

gulp.task('default', function (callback){
	runSequence(['sass', 'browserSync', 'watch'],
		callback)
});