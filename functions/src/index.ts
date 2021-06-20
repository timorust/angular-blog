import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


// Auth
export const userCreated = functions.auth.user().onCreate(async (user:any) => {
  if(user.email === 'timorust1@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  }
  if(user.email === 'almamishkinbb@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { editor: true });
  }
  if(user.email === 'agaigal@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { author: true });
  }
  if(user.email === 'Matahel148@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { moderator: true });
  }
  return { success: true }
});







// //-----Https---------------------------------------------------------------------------------
// // Https
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//
// // onCall
// export const funAuth = functions.https.onCall(async(data, context) => {
//   let {} = data;
//   if(!context.auth?.token.admin) { throw new functions.https.HttpsError('unauthenticated', 'UNAUTHENTICATED');}
//   return {};
// })
//
//
// //----Auth------------------------------------------------------------------------------------
//
// export const userDelete = functions.auth.user().onDelete(async (user:any) => {
//   if(user.email === 'timorust1@gmail.com') {
//     await admin.auth().setCustomUserClaims(user.uid, { admin: true });
//   }
//   return { success: true }
// });
//
//
// //--- firestore---------------------------------------------------------------------------------
// // onCreated
// exports.userCreated = functions.firestore.document('users/{userId}').onCreate(async(snap, context) => {
//   // const userId: string = context.params.userId;
//   // const dataDoc: FirebaseFirestore.DocumentData = snap.data();
//
//   return;
// });
//
// // onUpdate
// export const userUpdate = functions.firestore.document('users/{userId}/data/Licence').onUpdate(async(change, context) => {
//   const userAfter = change.after.data();
//   const userBefore = change.before.data();
//
//   // Avoid idempotent
//   if(userAfter.isEqual(userBefore)) {
//     return;
//   }
//   return {success: true};
// });
//
// // onDelete
// exports.userDelete = functions.firestore.document('users/{userId}').onDelete(async(snap, context) => {
//   // const removeDataDoc: FirebaseFirestore.DocumentData = snap.data();
//   // const userId: string = context.params.userId;
//   return;
// });
//
//
// //---pubsub-------------------------------------------------------------------------------------------------------------
// export const autoFun = functions.pubsub.schedule('29 15 * 5-12 2-6').onRun(async context => {});
