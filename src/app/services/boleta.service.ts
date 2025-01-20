import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoletaService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener la colección de boletas
  getBoleta(): Observable<any[]> {
    return this.firestore.collection('boleta').valueChanges({ idField: 'id' });
  }
}
