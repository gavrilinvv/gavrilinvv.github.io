var gulp = require('gulp'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat');
	// del = require('del');

gulp.task('css', gulp.series(function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(scss())
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('build/css'))
}));

gulp.task('js', gulp.series(function () {
  return gulp.src('src/js/*.js')
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(gulp.dest('build/js'));
}));

gulp.task('del', (function() {
	del(['build/** /*']);
}));

gulp.task('watch', function() {
	gulp.watch('src/scss/** /*.scss', ['build']);
})

gulp.task('build', gulp.series('css'));
