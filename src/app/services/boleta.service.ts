import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoletaService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener boleta por numeroBoleta
  obtenerBoletaPorNumero(numeroBoleta: string): Observable<any[]> {
    return this.firestore.collection('boleta', ref => ref.where('numeroBoleta', '==', numeroBoleta))
      .valueChanges()
      .pipe(
        catchError(error => {
          console.error(`Error al obtener boleta con número de boleta ${numeroBoleta}:`, error);
          throw error;
        })
      );
  }

  // Otros métodos no cambian...
  guardarBoleta(boleta: any): Promise<any> {
    return this.firestore.collection('boleta').add(boleta)
      .catch(error => {
        console.error('Error al guardar la boleta:', error);
        throw error;
      });
  }

  obtenerBoletas(): Observable<any[]> {
    return this.firestore.collection('boleta').valueChanges()
      .pipe(
        catchError(error => {
          console.error('Error al obtener boletas:', error);
          throw error;
        })
      );
  }

  actualizarBoleta(id: string, data: any): Promise<void> {
    return this.firestore.collection('boleta').doc(id).update(data)
      .catch(error => {
        console.error(`Error al actualizar la boleta con ID ${id}:`, error);
        throw error;
      });
  }

  filtrarBoletasPorMesa(mesa: string): Observable<any[]> {
    return this.firestore
      .collection('boleta', ref => ref.where('mesa', '==', mesa))
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(`Error al filtrar boletas por mesa ${mesa}:`, error);
          throw error;
        })
      );
  }
}
