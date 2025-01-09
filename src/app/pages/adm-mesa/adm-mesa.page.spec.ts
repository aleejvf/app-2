import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmMesaPage } from './adm-mesa.page';

describe('AdmMesaPage', () => {
  let component: AdmMesaPage;
  let fixture: ComponentFixture<AdmMesaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
