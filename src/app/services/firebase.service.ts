import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //Service for reading/ writing data to firebase service
  currentContact: any = null;
  constructor(public db: AngularFirestore) {

  }

  updateContact(userKey, value){
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteContact(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getContacts(){
    return this.db.collection('users').snapshotChanges();
  }

  createContact(value){
    return this.db.collection('users').add({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
      status: value.status
    });
  }
}
