import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CostumeService {
  constructor(private firestore: AngularFirestore) {}

  getCostumeById(id: string) {
    return this.firestore.collection('costumes').doc(id).valueChanges();
  }
  

  getCostumes() {
    return this.firestore.collection('costumes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any; 
        const id = a.payload.doc.id; 
        return { id, ...data }; 
      }))
    );
  }

  addCostume(costume: any): Promise<any> {
    const costumeRef = this.firestore.collection('costumes').doc();
    return costumeRef.set(costume).then(()=> {
      return { id: costumeRef, ...costume };
    })
  }

  deleteCostume(costumeId: string): Promise<void> {
    return this.firestore.collection('costumes').doc(costumeId).delete();
  }
}
