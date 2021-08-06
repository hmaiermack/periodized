import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA9zS3v7JabhJ1LJQCB-WdURWNXWzrcDX4",
    authDomain: "periodized-5603c.firebaseapp.com",
    projectId: "periodized-5603c",
    storageBucket: "periodized-5603c.appspot.com",
    messagingSenderId: "861683012169",
    appId: "1:861683012169:web:6414f73c3cafb547eaa598"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();