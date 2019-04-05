import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import { AngularFireDatabaseModule, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Upload } from './models/upload.model';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Bill } from './models/billdetail.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  // extra
  billCollection: AngularFirestoreCollection<Bill>;
  bills: Observable<Bill[]>;
  billDoc: AngularFirestoreDocument<Bill>;
  // private uploads: FirebaseListObservable<GalleryImage[]>
  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase , private afs: AngularFirestore) {
    // extra
    this.billCollection = this.afs.collection('bills', ref => ref.orderBy('date'));
    this.bills = this.billCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Bill;
        // data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload  in progress observer
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },

      (error) => {
        // upload failed
        console.log(error);

      },
      (): any => {
        // upload success
        // upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
        console.log('uploded');
      }
    );

  }
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log('File Saved !');
  }
  addDetail(bill: Bill) {
    // this.billCollection.add
    console.log(bill);
    console.log('pushing data onto server');
    this.billCollection.add(bill);

  }
}
