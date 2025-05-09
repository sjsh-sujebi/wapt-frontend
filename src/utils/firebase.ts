import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ5WflS5r7q5-M7dvyr6U6T9uSmi-_lgM",
  authDomain: "wapt-14dde.firebaseapp.com",
  projectId: "wapt-14dde",
  storageBucket: "wapt-14dde.firebasestorage.app",
  messagingSenderId: "539322298613",
  appId: "1:539322298613:web:10a39c6c2e7cfd47b355bc",
  measurementId: "G-XSXQ8GYGRG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app, 'https://wapt-14dde-default-rtdb.asia-southeast1.firebasedatabase.app');

export const createRandomCode = () => {
    const digits = Math.floor(1000 + Math.random() * 9000);
    return digits
}

export const openChannel = (code: string, uuid: string, callback: (blobId: string, fileName: string) => void) => {
    const messageRef = ref(db, `/codes/${uuid}/`)
    const uuidRef = ref(db, `/uuids/${code}`)
    set(uuidRef, uuid)
    onValue(messageRef, (snapshot) => {
        const data = snapshot.val()
        if (data == null) {
            return
        }
        const [blobId, fileName] = data.split("/")
        callback(blobId, fileName)
    })
}

export const uploadToChannel = (uuid: string, blobId: string, fileName: string) => {
    const messageRef = ref(db, `/codes/${uuid}/`)
    set(messageRef, `${blobId}/${fileName}`)
}