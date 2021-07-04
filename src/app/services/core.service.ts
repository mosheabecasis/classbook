import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentInterface } from '../interfaces/student';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs:AngularFirestore) { }

  saveStudent(student:StudentInterface){
    return this.afs.collection('Students').add(student);
  }

  // addStudents(){
  //   return this.afs.collection('Students').valueChanges({idField:'id'});
  // }

  getStudents() {
    return this.afs.collection('Students').valueChanges({ idField: 'id' });
  }

  removeById(studentDoc: string) {
   return  this.afs.doc(`Students/${studentDoc}`).delete().then(() => {
     console.log(studentDoc);
      alert("Student Deleted");
    }).catch((error) => {
      console.error("Error removing student: ", error);
    });
  }
}
