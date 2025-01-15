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

  // Propiedad para manejar la categoría y subcategoría
  tituloCard: string = '';

  // Inyectamos el servicio
  constructor(private categoriaSubcategoriaService: CategoriaSubcategoriaService) { }

  ngOnInit() {
    // Configurar los valores predeterminados o cualquier lógica de inicialización si es necesario
  }

  // Función para configurar la categoría y subcategoría cuando se hace clic en "Ver más"
  setCategoriaYSubcategoria(categoria: string, subCategoria: string) {
    this.categoriaSubcategoriaService.setCategoria(categoria);
    this.categoriaSubcategoriaService.setSubCategoria(subCategoria);

    // Establecer el título para la card de la subcategoría
    this.tituloCard = `${categoria} - ${subCategoria}`;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
