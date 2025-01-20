import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  constructor(private firestore: AngularFirestore) {}

  // Método para crear una solicitud
  createSolicitud(hora: string, minuto: string, mesa: string): Promise<void> {
    const id = this.firestore.createId(); // Crear un ID único para la solicitud
    return this.firestore
      .collection('solicitud')
      .doc(id)
      .set({ id, hora, minuto, mesa }); // Incluimos el ID en los datos
  }

  // Método para obtener todas las solicitudes
  getSolicitudes(): Observable<any[]> {
    return this.firestore
      .collection('solicitud')
      .valueChanges(); // Obtiene un flujo de datos con todas las solicitudes
  }

  // Método para eliminar una solicitud por ID
  deleteSolicitud(id: string): Promise<void> {
    return this.firestore
      .collection('solicitud')
      .doc(id)
      .delete(); // Elimina la solicitud específica
  }
}
