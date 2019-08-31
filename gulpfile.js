const del = require('del');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const exec = require('child_process').exec;

const server = browserSync.create();
const clean = () => del(['public']);

function hugo() {
  return exec('hugo');
}

function hugoWithDrafts() {
  return exec('hugo -D');
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({ server: { baseDir: 'public' } });
  done();
}

const watch = () =>
  gulp.watch(['**/*', '!public'], gulp.series(hugoWithDrafts, reload));

const prod = gulp.series(clean, hugo);
const dev = gulp.series(clean, hugoWithDrafts, serve, watch);

exports.default = dev;
exports.production = prod;
