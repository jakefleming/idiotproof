var { src, series, watch, dest } = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var { exec } = require('child_process');

const css = function(){
  return src('src/scss/style.scss', {sourcemap: true})
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'expanded',
      includePaths: ['scss']
    }))
    .on('error', function (err){
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write())
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
};

const js = function(){
  return src('src/js/application.js')
    // .pipe(sourcemaps.init())
    .pipe(concat('application-min.js'))
    // .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(dest('./src/js'))
    .pipe(browserSync.stream())
};

const updateFontlist = function(done) {
    console.log('Updating List of Fonts');
    return exec("sh src/listfonts.sh");
};

const browserInit = function(done) {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  });
  done()
};

const browserUpdate = series(css, browserInit);

const browserReload = function(done) {
  browserSync.reload();
  done();
}

const watchFiles = function(done) {
      watch('src/scss/**/*.scss', css);
      watch('src/js/**/*.js', js);
      watch('*.html', browserReload);
      watch('fonts/**/*.{otf,ttf}', {
          events: ['add', 'unlink'],
        }, updateFontlist);
      watch('fonts/**/*.{otf,ttf}', {
        events: 'change',
      }, js);
      watch('txt/**/*.txt', {delay: 300}, js);
      done();
};

// DEFAULT
exports.default = series(updateFontlist, css, js, browserUpdate, watchFiles);
