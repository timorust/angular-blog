const fs = require('fs-extra');
(async() => {
  const src = './src/angular-blog-062021-firebase-adminsdk-8k81y-9213338da4.json';
  const lib = './lib/angular-blog-062021-firebase-adminsdk-8k81y-9213338da4.json';
  await fs.remove(lib);
  await fs.copy(src, lib);
})();
