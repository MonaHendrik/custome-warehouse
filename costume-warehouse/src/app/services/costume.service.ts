import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CostumeService {
  costumes = [{id:1000,name: 'Costume 1', description: 'This is a costume', price: '100', size: 'M', color: 'Red', count: '20',img:"https://imgs.search.brave.com/ayfT6axNk7K_j4oN3sPrj30U1Xq_0jzMoQEn4ScXajY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVnYW9vLmRlL2lt/YWdlcy9yZXBfYXJ0/L2xpc3RfdjUvMTcw/LzkvMTcwOTc5L3Bp/cmF0ZW4ta29zdHVt/LWZ1ci1kYW1lbi01/LXRlaWxpZy5qcGc"}];

  constructor(private firestore: AngularFirestore ) {}

  addCostume(costume: any) {
    const id = this.firestore.createId();
    return this.firestore.doc(`costumes/${id}`).set({...costume, id});
  }
  getCostumeById(id: number) {
    return this.costumes.find(costume => costume.id === +id);  
  }

  getCostumes() {
    return this.firestore.collection('costumes').valueChanges();

  }

  deleteCostume(id: string) {
    return this.firestore.doc(`costumes/${id}`).delete();
  }

  updateCostume(costume: any) {
    return this.firestore.doc(`costumes/${costume.id}`).update(costume);
  }
}
