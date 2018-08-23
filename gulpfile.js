var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var plugins = require('gulp-load-plugins')();


var jsCommon = './js/*.js';
var cssCommon = './styles/*.scss';

var destination = './compiled';
var css_destination = './css';

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
  ];


gulp.task('build-js-common', function() {
  return gulp.src(jsCommon)
    .pipe(plugins.concat('script.js'))
    .pipe(gulp.dest(destination));
});

gulp.task('build-sass', function() {
    return gulp.src(cssCommon)
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
      }))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(csso())
        .pipe(gulp.dest(css_destination));
});
 
gulp.task('watch', function() {
  gulp.watch(jsCommon, ['build-js-common']);
  gulp.watch(cssCommon, ['build-sass']);
});

gulp.task('build', [
  'build-js-common',
  'build-sass',
]);

gulp.task('sass_build', [
  'build-sass',
]);
 
gulp.task('default', ['build']);