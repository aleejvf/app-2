import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmPedidosPage } from './adm-pedidos.page';

describe('AdmPedidosPage', () => {
  let component: AdmPedidosPage;
  let fixture: ComponentFixture<AdmPedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
