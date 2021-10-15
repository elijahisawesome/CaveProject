import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBj0_38KSrhyeNTl3FumxbIn3XWt_uRtJo",
  
    authDomain: "well-in-the-cave.firebaseapp.com",
  
    projectId: "well-in-the-cave",
  
    storageBucket: "well-in-the-cave.appspot.com",
  
    messagingSenderId: "486728939623",
  
    appId: "1:486728939623:web:106c68115f43dbc6b27cc2"
  
  };

  const app = initializeApp(firebaseConfig);

  export default getFirestore(app);