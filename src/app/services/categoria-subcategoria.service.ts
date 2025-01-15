import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSubcategoriaService {
  private categoria: string = '';
  private subCategoria: string = '';

  setCategoria(categoria: string) {
    this.categoria = categoria;
  }

  getCategoria(): string {
    return this.categoria;
  }

  setSubCategoria(subCategoria: string) {
    this.subCategoria = subCategoria;
  }

  getSubCategoria(): string {
    return this.subCategoria;
  }
}
