require('babel-register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2', '.jpg', '.png'].forEach((ext) => require.extensions[ext] = () => {
});
require('./server');