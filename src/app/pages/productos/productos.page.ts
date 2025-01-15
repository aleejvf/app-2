import { Component, OnInit } from '@angular/core';
import { ProdDatosService } from '../../services/prod-datos.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoriaSubcategoriaService } from 'src/app/services/categoria-subcategoria.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage implements OnInit {

  products: any[] = []; // Lista de productos
  productosFiltrados: any[] = []; // Productos filtrados
  tituloCard: string = ''; // Variable para el título del card
  isAlertOpen = false;
  alertButtons = ['Listo'];

  // Función para abrir o cerrar la alerta
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  constructor(
    private prodDatosService: ProdDatosService,
    private router: Router,
    private productService: ProductService,
    private categoriaSubcategoriaService: CategoriaSubcategoriaService
  ) {}

  ngOnInit() {
    this.loadProducts(); // Cargar los productos desde Firebase al iniciar la página

    // Obtener la categoría y subcategoría seleccionada
    const categoriaSeleccionada = this.categoriaSubcategoriaService.getCategoria();
    const subCategoriaSeleccionada = this.categoriaSubcategoriaService.getSubCategoria();

    // Verifica los valores de categoría y subcategoría
    console.log('Categoria seleccionada:', categoriaSeleccionada);
    console.log('Subcategoria seleccionada:', subCategoriaSeleccionada);

    // Asignar el título del card
    if (subCategoriaSeleccionada) {
      this.tituloCard = subCategoriaSeleccionada; // Asigna el título solo si subCategoría está definida
    } else if (categoriaSeleccionada) {
      this.tituloCard = categoriaSeleccionada; // Si solo la categoría está seleccionada
    } else {
      this.tituloCard = 'No hay categoría o subcategoría seleccionada'; // Mensaje de respaldo
    }

    // Filtrar los productos según la categoría y subcategoría seleccionada
    if (categoriaSeleccionada && subCategoriaSeleccionada) {
      this.productosFiltrados = this.products.filter(producto =>
        producto.categoria === categoriaSeleccionada && producto.subCategoria === subCategoriaSeleccionada
      );
    } else if (categoriaSeleccionada) {
      // Si solo se seleccionó categoría, filtrar solo por categoría
      this.productosFiltrados = this.products.filter(producto =>
        producto.categoria === categoriaSeleccionada
      );
    } else {
      // Si no hay categoría o subcategoría seleccionada, mostrar todos los productos
      this.productosFiltrados = this.products;
    }

    // Verifica los productos filtrados
    console.log('Productos filtrados:', this.productosFiltrados);
  }

  // Método para cargar los productos desde Firebase
  loadProducts() {
    this.prodDatosService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data; // Asigna los datos a la lista de productos
        this.productosFiltrados = data; // Inicializa los productos filtrados con todos los productos
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  // Método para navegar a la página de detalles de un producto
  viewProductDetails(product: any) {
    this.productService.setProduct(product);  // Guardamos el producto seleccionado en el servicio
    this.router.navigate(['/deralle-prod']); // Navegamos a la página de detalles
  }
}
