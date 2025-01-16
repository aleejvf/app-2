// cloudinary-upload.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryUploadService {

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/<tu-cloud-name>/upload'; // Reemplaza <tu-cloud-name> por tu Cloud name
  private cloudinaryUploadPreset = '<tu-upload-preset>';  // Reemplaza con el upload preset que creaste en Cloudinary

  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', this.cloudinaryUploadPreset);  // El upload preset
    formData.append('cloud_name', '<tu-cloud-name>');  // El cloud name

    return this.http.post<any>(this.cloudinaryUrl, formData);
  }
}
