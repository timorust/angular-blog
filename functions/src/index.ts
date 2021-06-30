import * as admin from 'firebase-admin';
const serviceAccount = require('../lib/angular-blog-062021-firebase-adminsdk-8k81y-9213338da4.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  ...require('./claims'),
  ...require('./to-review'),
  ...require('./notify')
}

