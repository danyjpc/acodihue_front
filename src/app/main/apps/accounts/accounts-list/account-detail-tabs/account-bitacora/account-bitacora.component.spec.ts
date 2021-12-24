import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBitacoraComponent } from './account-bitacora.component';

describe('AccountBitacoraComponent', () => {
  let component: AccountBitacoraComponent;
  let fixture: ComponentFixture<AccountBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
