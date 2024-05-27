import Dexie from 'dexie';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


let FirebaseDB;
let LocalDB;

const DB_NAME = 'sales';


function initFirebase() {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://support.google.com/firebase/answer/7015592
    const firebaseConfig = {};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    FirebaseDB = getFirestore(app);
}

// initFirebase();


LocalDB = new Dexie(DB_NAME);
LocalDB.version(1).stores({
  sales: '++id'
});

async function recordSale(sale) {
    const ts = new Date();
    const record = {
        timestamp: `${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}`,
        items: sale.items,
        sale: sale.sale
    };

    await LocalDB.sales.add(record);

    if (FirebaseDB) {
      await setDoc(doc(FirebaseDB, "sales", "LA"), record);
    }
}


export { recordSale };
