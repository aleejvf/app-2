import { Component, OnInit } from '@angular/core';
import { ProdDatosService } from '../../services/prod-datos.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-adm-produc',
  templateUrl: './adm-produc.page.html',
  styleUrls: ['./adm-produc.page.scss'],
  standalone: false
})
export class AdmProducPage implements OnInit {

  products: any[] = []; // Lista de productos
  filteredProducts: any[] = []; // Productos filtrados
  selectedCategory: string = 'todos'; // Categoría seleccionada
  selectedSubCategory: string = ''; // Subcategoría seleccionada
  subCategoryOptions: string[] = []; // Opciones de subcategorías

  constructor(
    private prodDatosService: ProdDatosService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProducts(); // Cargar los productos al iniciar la página
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

  // Método que se ejecuta cuando cambia la categoría seleccionada
  onCategoryChange() {
    // Establecemos las opciones de subcategoría según la categoría seleccionada
    if (this.selectedCategory === 'bebida') {
      this.subCategoryOptions = ['cafe-caliente', 'cafe-frio', 'te'];
    } else if (this.selectedCategory === 'comida') {
      this.subCategoryOptions = ['dulce', 'preparados'];
    } else {
      this.subCategoryOptions = []; // No mostrar subcategorías si es "todos"
    }

    this.selectedSubCategory = ''; // Restablecer subcategoría seleccionada
    this.filterProducts(); // Filtrar productos cada vez que se cambia la categoría
  }

  // Método para filtrar productos basados en la categoría y subcategoría
  filterProducts() {
    if (this.selectedCategory === 'todos') {
      this.filteredProducts = this.products; // Si se selecciona 'todos', no se filtra
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.category === this.selectedCategory &&
        (this.selectedSubCategory === '' || product.subCategory === this.selectedSubCategory)
      );
    }
  }

  // Método para navegar a la página de detalles de un producto
  viewProductDetails(product: any) {
    this.productService.setProduct(product);  // Guardamos el producto seleccionado en el servicio
    this.router.navigate(['/adm-deta-prod']); // Navegamos a la página de detalles
  }
}
