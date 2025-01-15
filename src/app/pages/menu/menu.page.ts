import { Component, OnInit } from '@angular/core';
import { CategoriaSubcategoriaService } from './../../services/categoria-subcategoria.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  // Inyectamos el servicio
  constructor(private categoriaSubcategoriaService: CategoriaSubcategoriaService) { }

  ngOnInit() {
  }

  // Función para configurar la categoría y subcategoría cuando se hace clic en "Ver más"
  setCategoriaYSubcategoria(categoria: string, subCategoria: string) {
    this.categoriaSubcategoriaService.setCategoria(categoria);
    this.categoriaSubcategoriaService.setSubCategoria(subCategoria);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
