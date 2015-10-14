var gulp = require('gulp');
var stylus = require('gulp-stylus');
var babel = require('gulp-babel');
gulp.task('style',function(){
    return gulp.src('src/client/style/index.styl')
        .pipe(stylus({compress:true}))
        .pipe(gulp.dest('dist/assets/css/'));
});
gulp.task('script',function(){
    return gulp.src('src/client/script/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/assets/js/'));
});
gulp.task('html',function(){
    return gulp.src('src/client/index.html').pipe(gulp.dest('dist'));
});
gulp.task('main',function(){
    return gulp.src('src/browser/main.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['html','style','script','main']);
