import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmHistoPage } from './adm-histo.page';

describe('AdmHistoPage', () => {
  let component: AdmHistoPage;
  let fixture: ComponentFixture<AdmHistoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmHistoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
