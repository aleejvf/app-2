import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleProdPage } from './detalle-prod.page';

describe('DetalleProdPage', () => {
  let component: DetalleProdPage;
  let fixture: ComponentFixture<DetalleProdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
