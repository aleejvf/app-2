import { Component, OnInit } from '@angular/core';
import { ProdDatosService } from '../../services/prod-datos.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage implements OnInit {

  products: any[] = []; // Lista de productos
  filteredProducts: any[] = []; // Productos filtrados
  isAlertOpen = false; // Control de alerta
  alertButtons = ['Listo']; // Botones de alerta

  constructor(
    private prodDatosService: ProdDatosService,
    private router: Router,
    private productService: ProductService,
    private SolicitudService: SolicitudService
  ) {}

  ngOnInit() {
    this.loadProducts(); // Cargar los productos al iniciar la página
  }

  // Método para cargar los productos desde Firebase
  loadProducts() {
    this.prodDatosService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data; // Asigna los datos a la lista de productos
        this.filterProducts(); // Filtrar los productos después de cargarlos
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  // Método para filtrar productos basados en la subcategoría
  filterProducts() {
    const filtro = localStorage.getItem('filtro'); // Obtén el valor del localStorage
    console.log('Filtro en localStorage:', filtro); // Verifica el valor del filtro

    // Si existe un filtro en el localStorage, solo mostrar productos que coincidan con subCategory
    if (filtro) {
      this.filteredProducts = this.products.filter(product => {
        console.log('Producto:', product.title, 'Subcategoría:', product.subCategory); // Verifica las subcategorías
        return product.subCategory === filtro;
      });
    } else {
      // Si no hay filtro, mostramos todos los productos
      this.filteredProducts = this.products;
    }
  }

  // Método para obtener el título de la subcategoría desde el localStorage
  getSubCategoryTitle(): string {
    const filtro = localStorage.getItem('filtro');
    return filtro ? filtro : 'Todos los productos'; // Si no hay filtro, muestra "Todos los productos"
  }

  // Método para navegar a la página de detalles de un producto
  viewProductDetails(product: any) {
    this.productService.setProduct(product);  // Guardamos el producto seleccionado en el servicio
    this.router.navigate(['/detalle-prod']); // Navegamos a la página de detalles
  }

  // Método para abrir la alerta y crear la solicitud
  setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;

    if (isOpen) {
      // Obtén la mesa desde el localStorage
      const userInfoString = localStorage.getItem('informe'); // Extrae la información almacenada
      if (!userInfoString) {
        console.error('No se encontró información del usuario en localStorage.');
        return;
      }

      const userInfo = JSON.parse(userInfoString); // Convierte el string en objeto
      const mesa = userInfo.selectedMesa; // Obtén el valor de la mesa

      if (!mesa) {
        console.error('No se encontró la mesa seleccionada en la información del usuario.');
        return;
      }

      // Obtén la hora y el minuto actuales
      const now = new Date();
      const hora = now.getHours().toString().padStart(2, '0');
      const minuto = now.getMinutes().toString().padStart(2, '0');

      // Crea la solicitud en Firebase
      this.SolicitudService
        .createSolicitud(hora, minuto, mesa)
        .then(() => {
          console.log('Solicitud creada con éxito:', { hora, minuto, mesa });
        })
        .catch((error) => {
          console.error('Error al crear la solicitud:', error);
        });
    }
  }
}
