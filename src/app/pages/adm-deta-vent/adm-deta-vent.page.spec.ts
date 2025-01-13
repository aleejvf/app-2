import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmDetaVentPage } from './adm-deta-vent.page';

describe('AdmDetaVentPage', () => {
  let component: AdmDetaVentPage;
  let fixture: ComponentFixture<AdmDetaVentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmDetaVentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
