import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsAddressComponent } from './credits-address.component';

describe('CreditsAddressComponent', () => {
  let component: CreditsAddressComponent;
  let fixture: ComponentFixture<CreditsAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
