

import { initializeApp } from "firebase/app";
import {getFirestore ,
    collection ,
    getDocs,
    doc,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyBZjOlOcTasfv_vRHJa_tWurys6aC5q-r0",
  authDomain: "vanlife-2213b.firebaseapp.com",
  projectId: "vanlife-2213b",
  storageBucket: "vanlife-2213b.appspot.com",
  messagingSenderId: "506901254486",
  appId: "1:506901254486:web:d1b79fa850c13d042c06f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app)
const vansCollectionRef = collection(db , "Vanlife")

export async function getVans(){
    const snapShot = await getDocs(vansCollectionRef)
    const vans = snapShot.docs.map(doc=>({...doc.data() ,id : doc.id}))
    return vans
}
export  async function getVan(id){
    const docRef = doc(db, "Vanlife", id)
    const snapshot = await getDoc(docRef)
    console.log({...snapshot.data()})
    return {...snapshot.data(),
            id :snapshot.id
        } 
}
export async function getHostVans(){
    const q = query(vansCollectionRef ,where("hostId", "==", "123"))
    const snapShot = await getDocs(vansCollectionRef)
    const vans = snapShot.docs.map(doc=>({...doc.data() ,id : doc.id}))
    return vans
}





export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}