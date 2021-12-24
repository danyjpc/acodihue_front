import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsFiadoresComponent } from './credits-fiadores.component';

describe('CreditsFiadoresComponent', () => {
  let component: CreditsFiadoresComponent;
  let fixture: ComponentFixture<CreditsFiadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsFiadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsFiadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
