import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'boleta',
    loadChildren: () => import('./pages/boleta/boleta.module').then( m => m.BoletaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'adm-mesa',
    loadChildren: () => import('./pages/adm-mesa/adm-mesa.module').then( m => m.AdmMesaPageModule)
  },
  {
    path: 'adm-produc',
    loadChildren: () => import('./pages/adm-produc/adm-produc.module').then( m => m.AdmProducPageModule)
  },
  {
    path: 'adm-histo',
    loadChildren: () => import('./pages/adm-histo/adm-histo.module').then( m => m.AdmHistoPageModule)
  },
  {
    path: 'adm-pedidos',
    loadChildren: () => import('./pages/adm-pedidos/adm-pedidos.module').then( m => m.AdmPedidosPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'detalle-prod',
    loadChildren: () => import('./pages/detalle-prod/detalle-prod.module').then( m => m.DetalleProdPageModule)
  },

  {
    path: 'adm-deta-vent',
    loadChildren: () => import('./pages/adm-deta-vent/adm-deta-vent.module').then( m => m.AdmDetaVentPageModule)
  },
  {
    path: 'adm-deta-pedido',
    loadChildren: () => import('./pages/adm-deta-pedido/adm-deta-pedido.module').then( m => m.AdmDetaPedidoPageModule)
  },
  {
    path: 'adm-agregar-prod',
    loadChildren: () => import('./pages/adm-agregar-prod/adm-agregar-prod.module').then( m => m.AdmAgregarProdPageModule)
  },
  {
    path: 'adm-edit-prod',
    loadChildren: () => import('./pages/adm-edit-prod/adm-edit-prod.module').then( m => m.AdmEditProdPageModule)
  },
  {
    path: 'adm-deta-prod',
    loadChildren: () => import('./pages/adm-deta-prod/adm-deta-prod.module').then( m => m.AdmDetaProdPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
