import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
const db = admin.firestore();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'timorust1@gmail.com',
    pass: 'szajbiuifhaauhhi'
  }
});

exports.alertAuthor= functions.firestore
  .document('posts/{postId}')
  .onUpdate(async (change, context) => {
    const postId = context.params.postId;

    const postDataAfter = change.after.data();
    const postDataBefore = change.before.data();


    if(!postDataBefore.published && postDataAfter.published) {
      const author = (await db.doc(`users/${postDataAfter.userId}`).get()).data();
      const { email, displayName } = author || { email: '', displayName: ''};

      await transporter.sendMail({
        from: 'info@timorust1.com',
        to: email,
        subject: `Hi ${displayName} your post has been published!`,
        html: `
          <h1>${postDataAfter.title}</h1>
          <p>${postDataAfter.body}</p>
          <a href="https://angular-blog-062021.web.app/posts/${postId}">Read the post on the blog</a>
         `
      });
    }


    return;
  });

