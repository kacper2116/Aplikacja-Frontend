import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIGSRDg64cbPdmn0js7iEGrgUUn4RcDl4",
  authDomain: "aplikacja-80393.firebaseapp.com",
  projectId: "aplikacja-80393",
  storageBucket: "aplikacja-80393.appspot.com",
  messagingSenderId: "23522663107",
  appId: "1:23522663107:web:bbc08eb2a5bee1838b2076"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export async function getImage(location) {
    const ImageURL = await getDownloadURL(ref(storage, location));
    return await ImageURL;
  }
  
