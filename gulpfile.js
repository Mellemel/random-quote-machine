var gulp = require('gulp'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  changed = require('gulp-changed'),
  gutil = require('gulp-util'),
  browserify = require('browserify'),
  browserSync = require('browser-sync')

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './public'
    }
  })
})

gulp.task('watch', ['jade', 'sass', 'js'], ()=>{
  gulp.watch('./src/*.jade', ['jade'], browserSync.reload)
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/js/**/*.js', ['js'], browserSync.reload)
})

gulp.task('jade', () => {
  return gulp.src('./src/*.jade')
    .pipe(changed('./public/'))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./public/'))
})

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(changed('./public/css/'))
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream())
})

gulp.task('js', () => {
  let b = browserify({
    entries: './src/js/app.js',
    debug: true
  })

  return b.bundle()
    .pipe(gulp.src('./src/js/**/*.js'))
    .pipe(changed('./public/js/'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js/'))
})