import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmDetaProdPage } from './adm-deta-prod.page';

describe('AdmDetaProdPage', () => {
  let component: AdmDetaProdPage;
  let fixture: ComponentFixture<AdmDetaProdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmDetaProdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
