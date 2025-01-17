import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class CloudinaryUploadService {
  // URL base para subir imágenes a Cloudinary
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dbq614kcp/image/upload'; 
  // Upload Preset configurado en tu cuenta de Cloudinary
  private cloudinaryUploadPreset = 'tu-upload-preset'; 

  constructor(private http: HttpClient) {}

  /**
   * Sube una imagen a Cloudinary
   * @param image Archivo de imagen seleccionado por el usuario
   * @returns Observable con la respuesta de Cloudinary
   */
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    // Agrega el archivo de imagen al FormData
    formData.append('file', image);

    // Agrega el Upload Preset para autenticar la carga
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    // Realiza la petición POST al endpoint de Cloudinary
    return this.http.post<any>(this.cloudinaryUrl, formData);
  }
}
