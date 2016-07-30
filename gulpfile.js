var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exorcist = require('exorcist');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');

// Declare our Constants
var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var ENTRY_FILE = SOURCE_PATH + '/main.js';
var OUTPUT_FILE = 'game_bundle.js';

 // Simple way to check for development/production mode.
function isProduction() {
    return argv.production;
}

 // Logs the current build mode on the console.
function logBuildMode() {

    if (isProduction()) {
        gutil.log(gutil.colors.green('Running production build...'));
    } else {
        gutil.log(gutil.colors.yellow('Running development build...'));
    }

}

// Deletes all content inside the './build' folder.
function cleanBuild() {
    del(['build/**/*.*']);
}

 // Transforms ES2015 code into ES5 code.
function build() {
    // Create source map for debugging
    var sourcemapPath = SCRIPTS_PATH + '/' + OUTPUT_FILE + '.map';
    // Log the current build to the console
    logBuildMode();

    return browserify({
        paths: [path.join(__dirname, 'src')],
        entries: ENTRY_FILE,
        debug: true,
        transform: [
            [
                babelify, {
                presets: ["es2015"]
            }
            ]
        ]
    })
        .transform(babelify)
        .bundle().on('error', function(error) {
            gutil.log(gutil.colors.red('[Build Error]', error.message));
            this.emit('end');
        })
        .pipe(gulpif(!isProduction(), exorcist(sourcemapPath)))
        .pipe(source(OUTPUT_FILE))
        .pipe(buffer())
        .pipe(gulpif(isProduction(), uglify()))
        .pipe(gulp.dest(SCRIPTS_PATH));

}

 // Starts the Browsersync server and watches for file changes in the 'src' folder.
function serve() {
    var options = {
        server: { baseDir: BUILD_PATH },
        open: false // Change it to true if you wish to allow Browsersync to open a browser window.
    };
    browserSync(options);

    // Watches for changes in files inside the './src' folder.
    gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-js']);

}


gulp.task('cleanBuild', cleanBuild);
gulp.task('build', ['cleanBuild'], build);
gulp.task('fastBuild', build);
gulp.task('serve', ['build'], serve);
gulp.task('watch-js', ['fastBuild'], browserSync.reload); // Rebuilds and reloads the project when executed.

// Run all the tasks by default when ran with 'gulp' on the cli
gulp.task('default', ['serve']);
