var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref =  require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');

var cssbeautify = require('gulp-cssbeautify');

/*
USAGE:

gulp.task('task-name', function(){
});

gulp.task('hello', function(){
  console.log('hello');
});

gulp.task('task-name', function(){
	return gulp.src('source-files') //get source files with gulp.src
	.pipe(aGulpPlugin())  			//send it through a gulp plugin
	.pipe(gulp.dest('destination')) //outputs the file in the destination folder
})

*/

gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir:'dist'
		}
	})
});

gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss') //get source files with gulp.src
	.pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
  .pipe(cssbeautify())  
	.pipe(gulp.dest('./app/css')) //outputs the file in the destination folder
	/*update for browserSync feature*/
	.pipe(browserSync.reload({
		stream:true
	}));
});



gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', function(){
    runSequence('sass', 'useref', 'inject', browserSync.reload);
  });/*.on('change', browserSync.reload);*/
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

/*======================================================================*/


/*js+css minification*/
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())

    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))

    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))

    .pipe(gulp.dest('./dist'));
});

/*image compression*/
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin

  .pipe(cache( imagemin({interlaced: true}) ))
  .pipe(gulp.dest('./dist/images'))
});

/*moving fonts*/
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'))
});



/*cleaning up*/
gulp.task('cache:clear', function(callback){
  return cache.clearAll(callback);
});

gulp.task('clean',function() {
  return del.sync(['dist']);
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

/*copy vendor files*/
gulp.task('copy-vendor-files', function(){
  return gulp.src(mainBowerFiles(), {base:'app/bower_components'})
  .pipe(gulp.dest('./dist/vendor'));
});


/*file auto inject*/
gulp.task('inject', function(){
  return gulp.src('dist/index.html')
  .pipe(inject(gulp.src(mainBowerFiles()), {ignorePath:'/app/bower_components/', relative:false, addRootSlash:false, addPrefix:"./vendor"}))
  .pipe(gulp.dest('./dist'));
});

/*build*/
gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'copy-vendor-files', ['useref', 'images', 'fonts'], 'inject',
    callback
  );
});

/*run*/
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync'], 'watch',
    callback
  );
});