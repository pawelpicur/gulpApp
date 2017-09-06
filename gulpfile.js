var gulp = require('gulp');

gulp.task('heroku:production', ['libs',  'less', 'jade', 'js']);