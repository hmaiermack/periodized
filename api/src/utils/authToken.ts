import admin from 'firebase-admin'
import { Request, Response, NextFunction } from "express";
import config from '../config'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.firebaseServiceAccount.project_id,
    clientEmail: config.firebaseServiceAccount.client_email,
    privateKey: config.firebaseServiceAccount.private_key
  }),
  databaseURL: 'periodized-5603c.firebaseapp.com'
});

async function decodeIDToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers?.authorization;
    if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
  
      const idToken = req.headers.authorization.split('Bearer ')[1];
  
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req['currentUser'] = decodedToken;
      } catch (err) {
        console.log(err);
      }
    }
  
    next();
  }

decodeIDToken.unless = require('express-unless')
  
export {
    decodeIDToken
}