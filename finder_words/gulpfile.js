const gulp = require('gulp'),
			sass = require('gulp-sass');

var paths = {
	src: {
		css: 'src/style.scss'
	},
	build: {
		css: 'build/css/'
	}
}

gulp.task('sass',function(){
	gulp.src(paths.src.css)
		.pipe(sass())
		.pipe(gulp.dest(paths.build.css))
});