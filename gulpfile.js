const gulp = require("gulp"); // Cet utilitaire va charger les fichiers
const uglify = require("gulp-uglify"); //Cet utilitaire va rendre le js plus petit (Modèle web)
const sass = require("gulp-dart-sass") // Cet utilitaire va réduire le fichier CSS et convertir le Super css en css normal

const browserSync = require('browser-sync')
const javascript = (done)=> {
    gulp.src("./src/js/*.js")
        .pipe(uglify()) //Pipe va permettre d'enchaîner les actions, on dit en quelque sorte à l'ordi à partir des actions précédentes tu vas réaliser l'action suivante
        .pipe( gulp.dest('./dist/js/'))

        done()
}
const styles = (done)=> {
    gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe( gulp.dest('./dist/css/'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(browserSync.stream())

        done()
}
const html = (done) => {
    gulp.src('./src/*html')
        .pipe(gulp.dest('./dist/'))

        done()

}
const browserSyncServer = (done) => {
    browserSync.init({
    server: {
        baseDir: "./dist"
    }
    }); 

    done()
}
const reloadBrowser = () => {
    browserSync.reload()
}
const watchfiles = (done) => {
    gulp.watch('./src/*.html', gulp.series(html, reloadBrowser))
    gulp.watch('./src/js/*.js', javascript)
    gulp.watch('./src/scss/*.scss', styles)
}
exports.default = gulp.parallel(html, styles, javascript) //On définit le lancement par défaut (run gulp) avec le lancement en série des trois différents scripts (html, styles, javascript) pour lancer tout en même temps on utilise gulp.parallel au lieu de gulp.series
exports.watch = gulp.parallel(browserSyncServer,gulp.series(gulp.parallel(html, styles, javascript), watchfiles)) 
//Nous venons de créer l'utilitaire watch qui va lancer la fonction watchfiles
// npm run permet de lancer les scripts présents dans package.json
// Pour quitter le npm run watch il faut faire ctrl+c
// Installer un utilitaire suit toujours ce schéma (En version local):  npm install --save-dev browser-sync
