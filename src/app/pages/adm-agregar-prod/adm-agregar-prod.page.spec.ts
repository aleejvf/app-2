import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmAgregarProdPage } from './adm-agregar-prod.page';

describe('AdmAgregarProdPage', () => {
  let component: AdmAgregarProdPage;
  let fixture: ComponentFixture<AdmAgregarProdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmAgregarProdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
