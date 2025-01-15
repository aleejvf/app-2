import { Component, OnInit } from '@angular/core';
import { ProdDatosService } from '../../services/prod-datos.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage implements OnInit {

  products: any[] = []; // Lista de productos
  filteredProducts: any[] = []; // Productos filtrados
  selectedCategory: string = 'todos'; // Categoría seleccionada
  selectedSubCategory: string = ''; // Subcategoría seleccionada
  subCategoryOptions: string[] = []; // Opciones de subcategorías
  isAlertOpen = false; // Control de alerta
  alertButtons = ['Listo']; // Botones de alerta

  constructor(
    private prodDatosService: ProdDatosService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadProducts(); // Cargar los productos al iniciar la página

    // Obtener parámetros de URL, si se desea agregar filtrado por subcategoría desde la URL
    this.route.queryParams.subscribe(params => {
      const subCategoriaSeleccionada = params['subCategory'];
      if (subCategoriaSeleccionada) {
        this.selectedSubCategory = subCategoriaSeleccionada;
        this.filterProducts(); // Filtrar productos al cargar la subcategoría
      }
    });
  }

  // Método para cargar los productos desde Firebase
  loadProducts() {
    this.prodDatosService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data; // Asigna los datos a la lista de productos
        this.filteredProducts = data; // Inicializa los productos filtrados
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  // Método para filtrar productos basados en la categoría y subcategoría
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory =
        this.selectedCategory === 'todos' ||
        product.category === this.selectedCategory;

      const matchesSubCategory =
        this.selectedSubCategory === '' ||
        product.subCategory === this.selectedSubCategory;

      return matchesCategory && matchesSubCategory;
    });
  }

  // Método para navegar a la página de detalles de un producto
  viewProductDetails(product: any) {
    this.productService.setProduct(product);  // Guardamos el producto seleccionado en el servicio
    this.router.navigate(['/detalle-prod']); // Navegamos a la página de detalles
  }

  // Función para abrir o cerrar la alerta
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}