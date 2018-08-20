const del = require('del');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const exec = require('child_process').exec;



const server = browserSync.create();
const clean = () => del(['public']);

function hugo(done) {
  return exec('hugo');
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({ server: { baseDir: 'public' } });
  done();
}

const watch = () => gulp.watch('layouts/**/*.html', gulp.series(hugo, reload));
const prod = gulp.series(clean, hugo);
const dev = gulp.series(clean, hugo, serve, watch);

exports.default = dev;
exports.production = prod;
