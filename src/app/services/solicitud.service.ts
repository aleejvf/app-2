import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private firestore: AngularFirestore) {}

  // Método para agregar la solicitud
  async addSolicitud(solicitud: any) {
    try {
      // Agregar la solicitud a la colección 'solicitudes'
      await this.firestore.collection('solicitudes').add(solicitud);
      console.log('Solicitud registrada exitosamente');
    } catch (error) {
      console.error('Error al registrar la solicitud: ', error);
    }
  }
}
