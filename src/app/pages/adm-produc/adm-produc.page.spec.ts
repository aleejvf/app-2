import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmProducPage } from './adm-produc.page';

describe('AdmProducPage', () => {
  let component: AdmProducPage;
  let fixture: ComponentFixture<AdmProducPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProducPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
