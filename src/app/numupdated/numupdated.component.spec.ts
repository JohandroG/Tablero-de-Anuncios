import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumupdatedComponent } from './numupdated.component';

describe('NumupdatedComponent', () => {
  let component: NumupdatedComponent;
  let fixture: ComponentFixture<NumupdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumupdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumupdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
