import { initializeApp } from "firebase/app";
import {
    initializeFirestore, getFirestore,
    persistentLocalCache, persistentMultipleTabManager,
    collection, doc, addDoc, getDoc, getDocs
} from "firebase/firestore";


let FirebaseDB;
const DB_NAMES = {
    sales: "sales",
    settings: "settings",
    catalog: "catalog",
};


function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyAW4fGZapP6WeyJEej8wkh0EMmH752nbsg",
        authDomain: "kiosko-andrew.firebaseapp.com",
        projectId: "kiosko-andrew",
        storageBucket: "kiosko-andrew.appspot.com",
        messagingSenderId: "515986206321",
        appId: "1:515986206321:web:202ed92586fae830c175d0"
    };

    const app = initializeApp(firebaseConfig);
    initializeFirestore(app, {
       localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager()
        }),
     });

     FirebaseDB = getFirestore(app);
}

async function recordSale(sale) {
    const ts = new Date();
    const record = {
        timestamp: `${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}`,
        items: sale.items,
        sale: sale.sale
    };

    const sales = collection(FirebaseDB, DB_NAMES.sales);
    await addDoc(sales, record);
}

async function getCatalogData() {
    const settingsDoc = doc(FirebaseDB, DB_NAMES.settings, "active");
    const settings = await getDoc(settingsDoc);

    const catalogCollection = collection(FirebaseDB, DB_NAMES.catalog);
    const sections = await getDocs(catalogCollection);

    const sectionDocs = [];
    sections.forEach((doc) => sectionDocs.push(doc.data()));
    sectionDocs.sort((s) => s.position);

    return {
        settings: settings.data(),
        sections: sectionDocs,
    };
}

initFirebase();
export { getCatalogData, recordSale };
