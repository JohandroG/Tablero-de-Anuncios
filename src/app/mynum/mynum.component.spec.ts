import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MynumComponent } from './mynum.component';

describe('MynumComponent', () => {
  let component: MynumComponent;
  let fixture: ComponentFixture<MynumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MynumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MynumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
