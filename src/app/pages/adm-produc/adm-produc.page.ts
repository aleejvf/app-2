import { Component, OnInit } from '@angular/core';
import { ProdDatosService } from '../../services/prod-datos.service'; // Servicio para interactuar con Firebase
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service'; // Servicio para manejar la información del producto

@Component({
  selector: 'app-adm-produc',
  templateUrl: './adm-produc.page.html',
  styleUrls: ['./adm-produc.page.scss'],
  standalone: false
})
export class AdmProducPage implements OnInit {
  products: any[] = []; // Lista de productos cargados desde Firebase
  filteredProducts: any[] = []; // Productos filtrados según la categoría y subcategoría
  selectedCategory: string = 'todos'; // Categoría seleccionada por el usuario
  selectedSubCategory: string = ''; // Subcategoría seleccionada por el usuario
  subCategoryOptions: string[] = []; // Opciones de subcategorías según la categoría

  constructor(
    private prodDatosService: ProdDatosService, // Servicio para interactuar con Firebase
    private router: Router, // Para navegar entre las páginas
    private productService: ProductService // Servicio para manejar los productos
  ) {}

  ngOnInit() {
    this.loadProducts(); // Cargar los productos de Firebase cuando se inicie el componente
  }

  // Método para cargar los productos desde Firebase
  loadProducts() {
    this.prodDatosService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data; // Asigna los productos cargados a la variable products
        this.filteredProducts = data; // Inicializa los productos filtrados con todos los productos
      },
      (error) => {
        console.error('Error al cargar los productos desde Firebase:', error);
      }
    );
  }

  // Método que se ejecuta cuando cambia la categoría seleccionada
  onCategoryChange() {
    // Configura las opciones de subcategoría según la categoría seleccionada
    if (this.selectedCategory === 'bebida') {
      this.subCategoryOptions = ['cafe-caliente', 'cafe-frio', 'te'];
    } else if (this.selectedCategory === 'comida') {
      this.subCategoryOptions = ['dulce', 'preparados'];
    } else {
      this.subCategoryOptions = []; // Si es "todos", no se muestra subcategorías
    }

    this.selectedSubCategory = ''; // Restablece la subcategoría seleccionada
    this.filterProducts(); // Aplica el filtro de productos
  }

  // Método para filtrar productos según la categoría y subcategoría seleccionadas
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory =
        this.selectedCategory === 'todos' || product.category === this.selectedCategory;

      const matchesSubCategory =
        this.selectedSubCategory === '' || product.subCategory === this.selectedSubCategory;

      return matchesCategory && matchesSubCategory; // Devuelve los productos que coinciden con los filtros
    });
  }

  // Método para navegar a la página de detalles de un producto
  viewProductDetails(product: any) {
    this.productService.setProduct(product); // Guarda el producto seleccionado en el servicio
    this.router.navigate(['/adm-deta-prod']); // Navega a la página de detalles
  }

  // Método para navegar a la página de edición de un producto
  editProduct(product: any) {
    this.productService.setProduct(product); // Guarda el producto seleccionado en el servicio
    this.router.navigate(['/adm-edit-prod']); // Navega a la página de edición
  }
}
