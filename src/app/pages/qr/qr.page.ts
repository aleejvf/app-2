import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false,
})
export class QrPage implements OnInit {
  mesas: string[] = ['Mesa 1', 'Mesa 2', 'Mesa 3']; // Opciones de mesas
  selectedMesa: string | null = null; // Mesa seleccionada

  constructor(
    private router: Router,

  ) {}

  ngOnInit() {}

  // Método para seleccionar una mesa y guardar la información en localStorage
  selectMesa(mesa: string): void {
    this.selectedMesa = mesa;

    // Obtener el usuario actual desde el localStorage
    const userInfoString = localStorage.getItem('informe');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);

      // Agregar la mesa seleccionada al objeto del usuario
      userInfo.selectedMesa = mesa;

      // Guardar nuevamente el objeto actualizado en localStorage
      localStorage.setItem('informe', JSON.stringify(userInfo));

      console.log('Información actualizada en localStorage:', userInfo);

      // Redirigir al menú
      this.router.navigate(['/menu']);
    } else {
      console.error('No se encontró información del usuario en localStorage.');
    }
  }

  // Método para borrar el localStorage y redirigir al login
  goBack(): void {
    localStorage.clear(); // Borra todos los datos del localStorage
    console.log('Datos borrados del localStorage.');
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
