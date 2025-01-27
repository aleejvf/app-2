import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class CloudinaryUploadService {
  // URL base para subir imágenes a Cloudinary
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dbhobtfhs/image/upload'; 

  // Configuración de Cloudinary
  private uploadPreset = 'images'; // Upload Preset configurado en Cloudinary
  private apiKey = '824135419896176'; // API Key de Cloudinary

  constructor(private http: HttpClient) {}

  /**
   * Sube una imagen a Cloudinary
   * @param file Archivo de imagen seleccionado por el usuario
   * @returns Observable con la respuesta de Cloudinary
   */
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();

    // Agrega el archivo al FormData
    formData.append('file', file);

    // Agrega los datos necesarios para la carga
    formData.append('upload_preset', this.uploadPreset); // Preset de carga
    formData.append('api_key', this.apiKey); // API Key

    // Realiza la petición POST al endpoint de Cloudinary
    return this.http.post<any>(this.cloudinaryUrl, formData);
  }
}
