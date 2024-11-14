var { src, series, watch, dest } = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var { exec } = require('child_process');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');  // Add this line

const css = function(){
  return src('src/scss/style.scss', {sourcemaps: true})
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(cleanCSS())  // Add this line to minify the CSS
    .pipe(sourcemaps.write('./'))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
};

const webpackConfig = {
  mode: 'production',  // Adds minification
  entry: './src/js/index.js',
  output: {
    filename: 'application.js'
  },
  devtool: 'source-map', //to prevent eval()
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  }
};

const js = function() {
  return src('src/js/index.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest('./src/js'))  // This will output application.js (minified)
    .pipe(browserSync.stream());
};

const updateFontlist = function() {
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
  done();
};

const browserUpdate = series(css, browserInit);

const browserReload = function(done) {
  browserSync.reload();
  done();
}

const watchFiles = function(done) {
  watch('src/scss/**/*.scss', css);
  watch([
    'src/js/**/*.js',
    '!src/js/**/*-min.js',
    '!src/js/application.js',     // Exclude the output file
    '!src/js/application.js.map', // Exclude the source map
    '!src/js/**/*.LICENSE.txt'    // Exclude the license file
  ], js);
  watch('*.html', browserReload);
  watch('fonts/**/*.{otf,ttf}', {
    events: ['add', 'unlink'],
  }, updateFontlist);
  watch('fonts/**/*.{otf,ttf}', {
    events: ['change'],
  }, js);
  watch('src/txt/**/*.txt', {
    delay: 300
  }, js);
  done();
};

// DEFAULT
exports.default = series(updateFontlist, css, js, browserUpdate, watchFiles);
