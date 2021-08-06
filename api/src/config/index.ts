import dotenv from 'dotenv'
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// config() will read your .env file, parse the contents, assign it to process.env.
const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error(`${envFound.error}`);
}

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  dbUri: process.env.DBURI as string,
  firebaseServiceAccount: {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID as string,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID as string,
    "private_key": process.env.FIREBASE_PRIVATE_KEY as string,
    "client_email": process.env.FIREBASE_EMAIL as string,
    "client_id": process.env.FIREBASE_CLIENT_ID as string,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL as string
  }
}
