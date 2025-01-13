import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmDetaPedidoPage } from './adm-deta-pedido.page';

describe('AdmDetaPedidoPage', () => {
  let component: AdmDetaPedidoPage;
  let fixture: ComponentFixture<AdmDetaPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmDetaPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
