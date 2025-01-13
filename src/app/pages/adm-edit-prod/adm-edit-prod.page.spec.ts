import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmEditProdPage } from './adm-edit-prod.page';

describe('AdmEditProdPage', () => {
  let component: AdmEditProdPage;
  let fixture: ComponentFixture<AdmEditProdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmEditProdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
