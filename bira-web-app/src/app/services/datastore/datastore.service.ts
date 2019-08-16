import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  store: AngularFirestore;
  constructor(private afs: AngularFirestore) {
      this.store = afs;
   }

  sprintsForTeam(teamId) {
    return this.afs.collection('sprints', ref => ref.where('teamId', '==', teamId)).valueChanges();
  }

  userStoriesForSprint(sprintId) {
    return this.afs.collection('userStories', ref => ref.where('sprintId', '==', sprintId)).valueChanges();
  }

  findUser(userId) {
    return this.afs.collection('users').doc(userId).valueChanges();
  }

  getAllFromType(type: any) {
    return this.afs.collection(type).valueChanges();
  }

  getAllFromTypeSorted(type: any, property: any) {
    return this.afs.collection(type, ref => ref.orderBy(property)).valueChanges();
  }

  findObjectOfType(type: any, objectId: any) {
    return this.afs.collection(type).doc(objectId).valueChanges();
  }

  checkIfObjectExists(type: any, objectId: any) {
    return this.afs.collection(type).doc(objectId).get().toPromise();
  }

  getPropertiesOfType(type: string) {
    return this.findObjectOfType('properties', type);
  }

  getObjectFromId(objectId: string) {
    const type =  objectId.substring(0, objectId.lastIndexOf('Id')) + 's';
    return this.afs.collection(type).doc(objectId).valueChanges();
  }

  updateDocument(type: any, objectId: any, data: any) {
    this.afs.collection(type).doc(objectId).set(data, {merge: true});
  }

  upsertDocument(type: any, saveableObject: any, objectId?: any) {
    if (objectId) {
      this.updateDocument(type, objectId, saveableObject);
    } else {
      const newId = this.afs.createId();
      const copy = JSON.parse(JSON.stringify(saveableObject));
      copy.uid = newId;
      this.afs.collection(type).doc(newId).set(copy);
    }
  }
}
