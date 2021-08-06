import React from "react";
import firebase from "firebase/app";

//null when user not signed in
export const AuthContext = React.createContext<firebase.User | null>(null);
