# Gulp Project Template

[https://css-tricks.com/gulp-for-beginners/](https://css-tricks.com/gulp-for-beginners/)

[https://github.com/zellwk/gulp-starter-csstricks](https://github.com/zellwk/gulp-starter-csstricks/)


install node.js to use npm 


install gulp globally:

**npm install gulp -g**



//************************************************//

create folder 'projectname'

**npm init** (creates a package.json)

**npm install** (installs all package.json dependencies automatically)

save to devDependencies in package.json:

**npm install gulp --save-dev**

useful imports:

**npm install gulp-autoprefixer** 

(add vendor prefixes to css rules using values from can i use)

**npm install gulp-sourcemaps** 

(source maps support for gulp.js - allows viewing of actual source and not the processed css from browser debugging)

**npm install --save-dev gulp-bower-normalize**

(Takes a list of bower files and normalizes them by as / where type is inferred by file extension or taken from 'override' section of bower.json)

**npm install --save-dev gulp-inject**

(A javascript, stylesheet and webcomponent injection plugin for Gulp, i.e. inject file references into your index.html)

**npm install --save-dev main-bower-files**

(Get main files from your installed bower packages.)

//************************************************//
(create a file gulpfile.js)

# DEVELOPMENT PROCESSES 
## - [Compile sass to css](#compile-sass-to-css)
## - [watching - Reload the browser whenever a file is saved](#watching)
## - [BrowserSync - Started a web server for development](#browsersync)



javascript:

```javascript
var gulp = require('gulp');

gulp.task('task-name', function(){
});
```

```javascript
gulp.task('task-name', function(){
  return gulp.src('source-files') //get source files with gulp.src
  .pipe(aGulpPlugin())      //send it through a gulp plugin
  .pipe(gulp.dest('destination')) //outputs the file in the destination folder
})

```


//************************************************//

## Compile sass to css

plugin: gulp-sass

save to devDependencies in package.json:

console: 

**npm install gulp-sass --save-dev**


javascript:
```javascript
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') //get source files with gulp.src
  .pipe(sass().on('error', sass.logError))        //using gulp-sass
  .pipe(gulp.dest('app/css')) //outputs the file in the destination folder
});
```

//************************************************//

### globbing (pattern matching for files allow more than one file into gulp.src)

*.scss - pattern match all in current directory ending with .scss

**/*.scss - pattern match in root folder and any child directories

!not-me.scss - ! indicates exlude the pattern from match

*.+(scss | sass) - +() allows matching multiple patterns with different patterns separated by |



//************************************************//

## watching 

watching checks to see if a file was saved.  and automatically runs 'sass' task whenever you save a .scss file

```javascript
gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
```
or
```javascript
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})
```

//************************************************//

## BrowserSync 

BrowserSync automatically reload browser whenever we save a .scss file

save to devDependencies in package.json:

console: 

**npm install browser-sync --save-dev**

/*  
we create a browserSync task to enable Gulp to spin up a server using BrowserSync. 
we let browserSync know where the root of the server should be
*/

javascript:
```javascript
var browserSync = require('browser-sync');

gulp.task('browserSync', function(){
  browserSync.init({
    server:{
      baseDir:'app'
    }
  })
});
```
we update our 'sass' task to allow browserSync to inject new CSS styles(update the css) into the browser

javascript:
```javascript
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))

    .pipe(browserSync.reload({
      stream: true
    }));
});
```
//************************************************//

auto-reloading browswer with browserSync 

telling the watch task that browserSync must be completed before watch is allowed to run
we do this by adding a second argument to 'watch' task

```javascript
gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], 

function (){
  // ...
})
```

/*adding second argument to 'watch' task, 'browserSync' must be completed before 'watch' task is allowed to run*/

/*we also want to make sure 'sass' runs before watch so the CSS will already be the latest whenever we run a gulp command*/

```javascript
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})
```

reload browser if any html or js gets saved
add to the 'watch' task

  /*reload browser when html or js files change*/

  gulp.watch('app/*.html', browserSync.reload);

  gulp.watch('app/js/**/*.js', browserSync.reload);

'watch task' becomes:
```javascript
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})
```
if you get the "Cannot GET" error here.. it is because you do not have an index.html file in the 'app' folder

```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
  
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>

```
//************************************************//

up to this point in the tutorial we have


DEVELOPMENT PROCESSES

- using the sass preprocessor

- reload the browser whenever a file is saved

- started a web server for development




next...

# OPTIMIZING

## - [Optimizing Css And Javascript Files](#optimizing-css-and-javascript-files)

## - [Optimizing Images](#optimizing-images) 

## - [Copying Fonts To Dist](#copying-fonts-to-dist)

## - [Cleaning Up Generated Files Automatically](#cleaning-up-generated-files-automatically)

## - [Combining Gulp Tasks](#combining-gulp-tasks)

//************************************************//

//************************************************//

## Optimizing Css And Javascript Files 

(prepare files for production)

1.concatenation

2.minification




### 1.concatenation

'gulp-useref' fixes concatenation problems (difficult to concatenate scripts in correct order)

Gulp-useref concatenates any number of CSS and JavaScript files into a single file by looking for a comment that 
starts with "<!--build:" 
and ends with "<!--endbuild-->".

syntax:

```html
<!-- build:<type> <path> -->
...some html
<!-- endbuild -->
```

<type> can be js, css, or remove
<path> the target path of the generated file 

```html
<!--build:js js/main.min.js -->
  <script src="js/lib/a-library.js"></script>
  <script src="js/lib/another-library.js"></script>
  <script src="js/main.js"></script>
<!-- endbuild -->
```

console: 

**npm install gulp-useref --save-dev**

javascript:
```javascript
var useref =  require('gulp-useref');

<!-- basic useref -->
gulp.task('useref', function(){
  return gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulp.dest('dist'))
});

```
//calling the tast will run through the 3 script tags and concatenate 
anything within "<!--build:" and "<!--endbuild-->" 

into one single JavaScript file that outputs to `js/main.min.js`
this line is created automatically

or for css concatenation
```html
<!--build:css css/styles.min.css-->
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/another-stylesheet.css">
<!--endbuild-->
```


//************************************************//

### 2.minification

'gulp-uglify' (helps minify js files)

'gulp-if' (ensures only js files are minified)

console: 
  
  **npm install gulp-uglify --save-dev**

  **npm install gulp-if --save-dev**

javascript:
```javascript
// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())

    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});
```

### css minification

package: 'gulp-cssnano'

console: 

**npm install gulp-cssnano --save-dev**


javascript:
```javascript
var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))

    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});
```
//************************************************//

## Optimizing Images

file types that can be minified: png, jpg, gif, svg

plugin: gulp-imagemin

console: 

**npm install gulp-imagemin --save-dev**


javascript:
```javascript
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())            //imagemin can be customized to have object/value properties
  .pipe(gulp.dest('dist/images'))
});

```


...too slow
so you dont want to repeat this process unless necessary
so we use 
plugin: 'gulp-cache'

console:

**npm install gulp-cache --save-dev**

javascript: 
```javascript
var cache = require('gulp-cache');

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});
```
//************************************************//

## Copying Fonts To Dist

all we need to do is copy the fonts into the dist directory

We can copy files with Gulp simply by specifying the gulp.src and gulp.dest without any plugins.

```javascript
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})
```

//************************************************//

## Cleaning Up Generated Files Automatically

The del function takes in an array of node globs which tells it what folders to delete.

plugin: del

console: 

**install del --save-dev**

javascript: 
```javascript
var del = require('del');

gulp.task('clean', function () {
  return del.sync('dist').then(function(callback){
    return cache.clearAll(callback);    
  });
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

```
Now Gulp will delete the `dist` folder for you whenever gulp clean:dist is run.

Note: We don't have to worry about deleting the dist/images folder 
because gulp-cache has already stored the caches of the images on your local system.

To clear the caches off your local system, you can create a separate task that's named `cache:clear`

```javascript
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})
```

//************************************************//

## Combining Gulp Tasks

so far, we have created two distinct set of Gulp tasks

DEVELOPMENT PROCESS 

- compiling sass to css
- watch for changes
- reloaded the browser accordingly

grouping of tasks called gulp 'watch'

OPTIMIZING PROCESS

- ready all files for production website
- optimize assets like CSS, javascript and images
- copy fonts from app to dist

tasks we need to run:  clean:dist, sass, useref (uses gulp-uglify and gulp-cssnano) , images, fonts

BELOW IS WRONG!!! because gulp activates tasks in second argument simultaneously
so useref, images, or fonts gets completed before clean does, which mean entire dist folder is deleted

```javascript
gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
  console.log('Building files');
})
```

So, to ensure that cleans get completed before the rest of the tasks, we need to use an extra plugin called Run Sequence.

plugin: run-sequence

console: 

**npm install run-sequence --save-dev**

SYNTAX:
javascript:

```javascript
var runSequence = require('run-sequence');

gulp.task('task-name', function(callback) {
  runSequence('task-one', 'task-two', 'task-three', callback);
});
```

When task-name is called, Gulp will run task-one first. 
When task-one finishes, Gulp will automatically start task-two. 
Finally, when task-two is complete, Gulp will run task-three.

Run Sequence also allows you to run tasks simultaneously if you place them in an array:

```javascript
gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
```

In this case, Gulp first runs task-one. When task-one is completed, Gulp runs every task in the second argument simultaneously. 
All tasks in this second argument must be completed before task-three is run.

So we can now create a task that ensures that clean:dist runs first, followed by all the other tasks:
```javascript
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist', 'sass', ['useref', 'images', 'fonts'],
    callback
  )
})
```

To make things consistent, we can also build the same sequence with the first group. 
Let's use default as the task name this time:

```javascript
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync'], 'watch',
    callback
  )
})
```

Why default? Because when you have a task named default, you can run it simply by typing the gulp command, which saves some keystrokes.



//************************************************//

//************************************************//

# Bower

[https://bower.io/](https://bower.io/)

the aim of using bower is to speed up the including of packages.
collectively adds packages under same folder

bower_components/


**npm install -g bower**

**bower init** (creates bower.json file)

**bower search PACKAGE**

**bower install PACKAGE --save**

**bower install** 

**bower list**

**bower update <package>**

**bower update**

**bower uninstall <package>**


where to put the installed packages:

create a file called .bowerrc 

(This file tells Grunt that the Bower components, when installed, should be placed here.)