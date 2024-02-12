import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

// Konfiguracja firebase

const firebaseConfig = {
  apiKey: "AIzaSyBIGSRDg64cbPdmn0js7iEGrgUUn4RcDl4",
  authDomain: "aplikacja-80393.firebaseapp.com",
  projectId: "aplikacja-80393",
  storageBucket: "aplikacja-80393.appspot.com",
  messagingSenderId: "23522663107",
  appId: "1:23522663107:web:bbc08eb2a5bee1838b2076"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const getStorageRef = (path) => ref(storage, path);

export const getImages = async (folderPath) => {
  const storageRef = getStorageRef(folderPath);
  const images = [];

  try {
    const result = await listAll(storageRef);
    const downloadURLs = await Promise.all(result.items.map((item) => getDownloadURL(item)));
    images.push(...downloadURLs);
  } catch (error) {
    console.error('Error retrieving images from Firebase Storage:', error);
  }

  return images;
};