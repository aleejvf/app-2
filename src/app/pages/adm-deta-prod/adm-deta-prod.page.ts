import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-adm-deta-prod',
  templateUrl: './adm-deta-prod.page.html',
  styleUrls: ['./adm-deta-prod.page.scss'],
  standalone: false
})
export class AdmDetaProdPage implements OnInit {

  product: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.product = this.productService.getProduct(); // Recuperamos el producto desde el servicio
  }

}
