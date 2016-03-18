var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    chalk = require('chalk'),
    notifier = require('node-notifier'),
    browserSync = require('browser-sync').create();

var paths = {
    projectName:'NATIVE VML Test',
    sassFiles: 'site/sass/**/*.scss',
    cssFolder:'site/css/',
    baseDirectory: 'site/'
};

//This compile styles once
gulp.task('style', function() {
    gulp.start('compile-styles');
    console.log(chalk.green( paths.projectName + " sass compiled to css"));
});

//This task recompile styles when it is saved
gulp.task('watch',function(){
  gulp.watch(paths.sassFiles, ['compile-styles']);
  console.log(chalk.green( paths.projectName + "sass being watched")); 
});

//This task spins up a local server and does what the watch task does, verbosely. 
gulp.task('serve',function(){
  browserSync.init({server: {baseDir: './'+paths.baseDirectory},notify: false}); //Starts server
  gulp.watch(paths.sassFiles, ['compile-styles']); //Starts watch task for SASS
  gulp.watch([paths.baseDirectory+"css/**/*.css",paths.baseDirectory+"**/*.html",paths.baseDirectory+"js/**/*.js"]).on('change', browserSync.reload); // Reloads browser on file update
});
    
//This task compiles SASS to CSS
gulp.task('compile-styles', function() {
  return sass(paths.sassFiles, { style: 'expanded' }) //Find sources and compiles scss files
    .pipe(autoprefixer({browsers:['Android > 4', 'Chrome > 35', 'Firefox > 35', 'Explorer > 10', 'iOS > 4', 'Opera > 25', 'Safari > 8', 'OperaMobile > 12', 'ChromeAndroid > 30', 'FirefoxAndroid > 30', 'ExplorerMobile > 10'],cascade: true})) //Adds vendor prefixes
    .pipe(gulp.dest(paths.cssFolder)) //Outputs to project folder
    .pipe(rename({suffix: '.min'})) //Adds minification to filename
    .pipe(cssnano({discardComments: {removeAll: true}})) //Minifies CSS
    .pipe(gulp.dest(paths.cssFolder)) //Outsputs to dist directory
    .pipe(notify({ message: 'Sass generated for '+paths.projectName })); //Notification that task is complete
});