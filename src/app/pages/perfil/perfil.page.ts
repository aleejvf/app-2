import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Servicio de Firebase Authentication
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  user: any; // Objeto para almacenar los datos del usuario autenticado
  isAlertOpen = false;
  alertButtons = ['Listo'];

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.getUserInfo(); // Llamar al método para obtener los datos del usuario
  }

  // Método para abrir/cerrar la alerta
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  // Obtener los datos del usuario autenticado
  getUserInfo() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user; // Guardar los datos del usuario en la variable `user`
      } else {
        // Si no hay un usuario autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    });
  }

  // Método para cerrar sesión
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
    });
  }
}
