const gulp = require('gulp');

const postcss = require('gulp-postcss'),
  next = require('postcss-cssnext'),
  cleancss = require('gulp-clean-css'),
  gzip = require('gulp-gzip'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

// Dev task
gulp.task('default', () =>
  gulp
    .src('src/sakura.css')
    .pipe(postcss([next()]))
    .pipe(sourcemaps.init())
    .pipe(cleancss({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'))
);

// todo: Dev watch task (browser sync)

// Build task
gulp.task('build', () =>
  gulp
    .src('src/sakura.css')
    .pipe(postcss([next()]))
    .pipe(autoprefixer({ browsers: ['last 10 versions', '> 1%'], cascade: false }))
    .pipe(cleancss({ level: 2 }))
    .pipe(gulp.dest('dist/'))
    .pipe(gzip())
    .pipe(gulp.dest('dist/'))
);
