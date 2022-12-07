import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfKFEHgYSBSnq3nkihvYbpHe9GVikJ2jk",
  authDomain: "byob-36558.firebaseapp.com",
  projectId: "byob-36558",
  storageBucket: "byob-36558.appspot.com",
  messagingSenderId: "298155384997",
  appId: "1:298155384997:web:9422c84ef71ee928446d4c",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
