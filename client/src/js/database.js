import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("post to the database");
  const putDb =  await openDB('jate', 1);
  const tx = putDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put(content);
  request.onsuccess = () => {
    console.log('success');
  }
  request.onerror = () => {
    console.log('error');
  }
  await tx.done;
  putDb.close();
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from the database");
  const getDb = await openDB('jate', 1);
  const tx = getDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  request.onsuccess = () => {
    console.log('success');
  }
  request.onerror = () => {
    console.log('error');
  }
  await tx.done;
  getDb.close();
};

initdb();
