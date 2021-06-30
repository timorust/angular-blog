import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'timorust1@gmail.com',
    pass: 'szajbiuifhaauhhi'
  }
});

// Auth
export const userCreated = functions.auth.user().onCreate(async (user) => {

  if(user.email === 'yurihechter@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    await db.doc(`users/${user.uid}`).update({[`role`]: 'admin'})
  }
  if(user.email === 'almamishkinbb@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { editor: true });
    await db.doc(`users/${user.uid}`).update({[`role`]: 'editor'})
  }
  if(user.email === 'agaigal@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { author: true });
    await db.doc(`users/${user.uid}`).update({[`role`]: 'author'})
  }
  if(user.email === 'Matahel148@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { moderator: true });
    await db.doc(`users/${user.uid}`).update({[`role`]: 'moderator'})
  }


  await transporter.sendMail({
    from: 'info@timorust1.com',
    to: user.email,
    subject: `Hi ${user.displayName} and Welcome to my blog!`,
    html:   `
        <h1>Hello ${user.displayName}</h1>
        <p style="text-align: center">Welcome to my Blog where you can discover about the world</p>
        <p>Best, <br/>
            Yuri
            <a href='https://angular-blog-062021.web.app'>Read the blog</a>
        </p>
      `
  });
  return;
});
