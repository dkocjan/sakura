const gulp = require('gulp');

const postcss = require('gulp-postcss'),
  next = require('postcss-cssnext'),
  cleancss = require('gulp-clean-css'),
  gzip = require('gulp-gzip'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename');

// Dev task
gulp.task('dev', () =>
  gulp
    .src('src/sakura.css')
    .pipe(postcss([next()]))
    .pipe(sourcemaps.init())
    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
);

// Dev watch task
gulp.task('reload', () => browserSync.reload());
gulp.task('watch', ['dev'], () => {
  browserSync({ server: true }, function(err, bs) {
    console.log(bs.options.getIn(['urls', 'local']));
  });
  gulp.watch(['index.html'], ['reload']);
  gulp.watch(['src/sakura.css'], ['dev']);
});

// Build task
gulp.task('build', () =>
  gulp
    .src('src/sakura.css')
    .pipe(postcss([next()]))
    .pipe(autoprefixer({ browsers: ['last 10 versions', '> 1%'], cascade: false }))
    .pipe(cleancss({ level: 2 }))
    .pipe(
      rename({
        basename: 'sakura.min',
        extname: '.css'
      })
    )
    .pipe(gulp.dest('dist/'))
    .pipe(gzip())
    .pipe(
      rename({
        basename: 'sakura',
        extname: '.gz'
      })
    )
    .pipe(gulp.dest('dist/'))
);
