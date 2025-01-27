import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar AngularFirestore

@Component({
  selector: 'app-adm-agregar-prod',
  templateUrl: './adm-agregar-prod.page.html',
  styleUrls: ['./adm-agregar-prod.page.scss'],
  standalone: false,
})
export class AdmAgregarProdPage {
  productImageFile: File | null = null; // Archivo de imagen seleccionado
  productTitle: string = '';
  productDescription: string = '';
  productPrice: number | null = null;
  productCategory: string = ''; // Almacena si es bebida o comida
  productSubCategory: string = ''; // Almacena subcategoría (café, té, etc.)

  // Configuración de Cloudinary
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dbhobtfhs/image/upload';
  private uploadPreset = 'images'; // Preset configurado en Cloudinary
  private apiKey = '824135419896176'; // API Key de Cloudinary

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  // Evento para actualizar la categoría
  onCategoryChange(event: any) {
    this.productSubCategory = ''; // Reinicia la subcategoría al cambiar de categoría
  }

  // Evento para manejar el archivo de imagen seleccionado
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productImageFile = file; // Almacena el archivo seleccionado
    }
  }

  // Método para subir la imagen a Cloudinary y obtener la URL
  async uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('api_key', this.apiKey);

    try {
      const response: any = await this.http.post(this.cloudinaryUrl, formData).toPromise();
      return response.secure_url; // Retorna la URL de la imagen subida
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('No se pudo subir la imagen.');
    }
  }

  // Método para agregar el producto
  async addProduct() {
    if (
      this.productTitle &&
      this.productDescription &&
      this.productPrice !== null &&
      this.productCategory &&
      this.productSubCategory
    ) {
      try {
        let imageUrl = '';
        if (this.productImageFile) {
          // Subir la imagen a Cloudinary y obtener la URL
          imageUrl = await this.uploadImageToCloudinary(this.productImageFile);
        }

        const newProduct = {
          image: imageUrl, // URL de la imagen subida
          title: this.productTitle,
          description: this.productDescription,
          price: this.productPrice,
          category: this.productCategory,
          subCategory: this.productSubCategory,
        };

        // Guardar el producto en Firestore
        await this.firestore.collection('productos').add(newProduct);
        console.log('Producto agregado:', newProduct);
        alert('Producto agregado correctamente.');
        
        // Limpia el formulario
        this.productImageFile = null;
        this.productTitle = '';
        this.productDescription = '';
        this.productPrice = null;
        this.productCategory = '';
        this.productSubCategory = '';
      } catch (error) {
        console.error('Error al agregar el producto:', error);
        alert('Ocurrió un error al agregar el producto.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
