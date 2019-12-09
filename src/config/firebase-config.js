import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBUG_Iibu_fZFJEFGpmrToSHSaBYOzdRzw",
  authDomain: "ait-app.firebaseapp.com",
  databaseURL: "https://ait-app.firebaseio.com",
  projectId: "ait-app",
  storageBucket: "ait-app.appspot.com",
  messagingSenderId: "994627706024",
  appId: "1:994627706024:web:28ec2a74ba0db98e18b69d",
  measurementId: "G-59WF9YL2ZN"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
