import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnumsconfigComponent } from './viewnumsconfig.component';

describe('ViewnumsconfigComponent', () => {
  let component: ViewnumsconfigComponent;
  let fixture: ComponentFixture<ViewnumsconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewnumsconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnumsconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
