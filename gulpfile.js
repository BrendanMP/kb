var gulp = require('gulp'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    path = require('path'),
    browserSync = require('browser-sync'),
    rename = require("gulp-rename"),
    environments = require('gulp-environments'),
    // Production
    cleanCSS = require('gulp-clean-css');

//var development = environments.development;
var production = environments.production;


gulp.task('sass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({
            includePaths: [
                './node_modules/bourbon/app/assets/stylesheets/',
                './node_modules/materialize-css/sass/'
            ],
            style: 'uncompressed',
            quiet: true
        }).on('error', sass.logError))
        .pipe(production(cleanCSS()))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src(['./src/js/*.js'])

        .pipe(gulp.dest('js/'));
});

gulp.task('html', () => {
    return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./'));
});

gulp.task('serve', ['sass','scripts','html'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./css/*.css').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

