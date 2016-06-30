var gulp          = require('gulp');
var sass          = require('gulp-sass');
var csso          = require('gulp-csso');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var mqpacker      = require("css-mqpacker");
var perfectionist = require('perfectionist');
var rename        = require('gulp-rename');

var processors = [
    autoprefixer({browsers: ['ie >= 8', 'last 3 versions', '> 2%']}),
    mqpacker
];

gulp.task('scss', function () {

    return gulp.src(['./scss/**/*.scss'])
        .pipe(sass({errLogToConsole: true}))
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(postcss([perfectionist()]))
        .pipe(gulp.dest('./dist'))

        .pipe(csso())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('default',['scss'], function(){
    gulp.watch('./scss/**/*.scss', ['scss']);
});
