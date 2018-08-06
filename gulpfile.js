const gulp = require("gulp"), //gulp
  sass = require("gulp-sass"), //sass
  concat = require("gulp-concat"), //конкатанация
  cssnano = require("gulp-cssnano"), //сжатие css
  rename = require("gulp-rename"); //ренейм

const source = "./app/",
  dist = "./dist/",
  path = {
    src: {
      js: source + "js/**/*.js",
      css: source + "css/",
      scss: source + "sass/**/*.scss",
      mainscss: source + "sass/main.scss"
    },
    dev: {
      js: dist + "js",
      css: dist + "css/",
      maincss: dist + "css/main.css"
    }
  };

//Препроцессинг scss
gulp.task("scss", function() {
  return gulp
    .src([path.src.mainscss])
    .pipe(sass().on("error", sass.logError)) //Преобразование scss в css
    .pipe(gulp.dest(path.dev.css)); //Результат
});

//Препроцессинг css
gulp.task("mincss", ["scss"], function() {
  return gulp
    .src([path.dev.maincss])
    .pipe(
      cssnano({
        //Добавление вендорных префиксов
        autoprefixer: {
          browsers: ["last 50 versions"],
          add: true
        }
      })
    ) //Сжатие css
    .pipe(rename({ suffix: ".min" })) //Ренейм
    .pipe(gulp.dest(path.dev.css)); //Результат
});

//Сборка js
gulp.task("js", function() {
  return gulp
    .src(path.src.js)
    .pipe(concat("main.js")) //Конкатанация
    .pipe(gulp.dest(path.dev.js)); //Результат
});

gulp.task("watch", ["mincss", "js"], function() {
  gulp.watch([path.src.scss], ["mincss"]);
  gulp.watch([path.src.js], ["js"]);
});
