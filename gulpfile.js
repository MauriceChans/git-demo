//在这里抽象我们需要的任务

/*1、LESS编译 压缩 合并
2、js合并 压缩 混淆
3、img复制
4、html压缩*/

//在gulpfile中先载入gulp包,因为这个包提供了一些api
var gulp = require('gulp');
var less = require('gulp-less');//less编译
var cssnano = require('gulp-cssnano');//css压缩

var concat = require('gulp-concat');//js合并
var uglify = require('gulp-uglify');//js压缩混淆

var htmlmin = require('gulp-htmlmin');

//1、LESS编译 压缩 --合并没有必要,一般预处理css都可以导包
gulp.task('style',function(){
	//这里是在执行style任务时自动执行的
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream:true}));//通知刷新一下
});

//2、js合并 压缩混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({stream:true}));//通知刷新一下
});

//3、img复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));//通知刷新一下
});

//4、html压缩
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));//通知刷新一下
});

//自动管理
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({server: {baseDir:['dist']}}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});

	//已启动就开启监听
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});