import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-agregar-prod',
  templateUrl: './adm-agregar-prod.page.html',
  styleUrls: ['./adm-agregar-prod.page.scss'],
  standalone: false
})
export class AdmAgregarProdPage implements OnInit {

  isModalOpen = false;
  productImage: any;
  productTitle: string = '';
  productDescription: string = '';
  productPrice: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Confirmar la acción y redirigir a la página de productos
  confirm() {
    // Aquí puedes agregar la lógica para guardar el producto
    // Ejemplo:
    console.log('Producto Agregado:', {
      image: this.productImage,
      title: this.productTitle,
      description: this.productDescription,
      price: this.productPrice,
    });

    // Redirigir a la página de productos
    this.router.navigate(['/adm-produc']);
    this.isModalOpen = false;
  }

}
