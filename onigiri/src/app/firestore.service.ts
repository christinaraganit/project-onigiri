import { Injectable } from '@angular/core';
import { 
  Firestore, 
  getFirestore, 
  collection,
  setDoc,
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  DocumentData,
  CollectionReference,
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore;
  userCol: CollectionReference<DocumentData>;

  constructor() { 
    this.db = getFirestore();
    this.userCol = collection(this.db, 'users');
  }

  async getUsers() {
    const snapshot = await getDocs(this.userCol);
    return snapshot;
  }

  async getUser(userId: string) {
    const snapshot = await getDoc(doc(this.db, 'users', userId));
    return snapshot;
  }

  async addUser(
    userId: string, 
    email: string,
    first_name: string,
    last_name: string,
    favourite_anime: string,
    favourite_manga: string,
  ) {
    await setDoc(doc(this.userCol, userId), {
      userId,
      email,
      first_name,
      last_name,
      favourite_anime,
      favourite_manga
    })
    return;
  }

  async deleteUser(userId: string) {
    const docRef = doc(this.db, 'users', userId);
    await deleteDoc(docRef);
    return;
  }

  async updateUser(
    userId: string,
    first_name: string,
    last_name: string,
    favourite_anime: string,
    favourite_manga: string
  ) {
    const docRef = doc(this.db, 'users', userId);
    await updateDoc(docRef, {first_name, last_name, favourite_anime, favourite_manga});
    return;
  }

  async addMediaToList(
    userId: string, 
    mediaId: string,
  ) {
    const date = new Date();
    await setDoc(doc(this.db, 'users', userId, 'lists', mediaId), {
      mediaId,
      date_added: date
    });
    return;
  }

  async getUserList(
    userId: string
  ) {
    let media_ids: any = [];
    const snapshot = await getDocs(collection(this.db, 'users', userId, 'lists'));
    snapshot.forEach(doc => {
      media_ids.push(doc.data());
    })
    return media_ids;
  }
}
