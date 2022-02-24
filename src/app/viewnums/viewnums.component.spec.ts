import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnumsComponent } from './viewnums.component';

describe('ViewnumsComponent', () => {
  let component: ViewnumsComponent;
  let fixture: ComponentFixture<ViewnumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewnumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
