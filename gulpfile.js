
var gulp       = require('gulp'), // Подключаем Gulp
    sass       = require('gulp-sass'), //Подключаем sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	rename       = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
// concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
// uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
// cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
// del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
// imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
// pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
// cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
// autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('scss', function(){ // Создаем таск sass
	return gulp.src('app/scss/**/*.scss') // Берем источник
		.pipe(sass({outputStyle: 'compressed'})) // Преобразуем sass в CSS посредством gulp-sass
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
 
gulp.task('html', function(){
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({stream: true}))

});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync.init({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});
 
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss')); // Наблюдение за scss файлами
	gulp.watch('app/*.html',gulp.parallel('html'))
});

gulp.task('default', gulp.parallel('scss','browser-sync', 'watch'));