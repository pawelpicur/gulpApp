import gulp from 'gulp';

gulp.task('heroku:production', ['libs',  'less', 'jade', 'js']);