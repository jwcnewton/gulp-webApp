var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync');



//sass recompile/prefix
gulp.task('css', function() {
    return gulp.src(['./src/sass/main.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.cssmin())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});
//Js min/concat
gulp.task('js', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './src/js/main.js',
            './src/js/admin.js'
        ])
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.concat('all.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});
//AUto compile
gulp.task('watch', function() {
    gulp.watch(['./src/sass/*.scss'], ['css']); //First argument is file to watch, second is task to run
    gulp.watch(['./src/js/*.js'], ['js']);
});

//Browser sync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('*html').on('change', browserSync.reload);
});

gulp.task('default', ['css', 'js', 'watch', 'serve']);