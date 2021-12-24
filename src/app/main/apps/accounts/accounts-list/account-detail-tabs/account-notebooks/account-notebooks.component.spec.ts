import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotebooksComponent } from './account-notebooks.component';

describe('AccountNotebooksComponent', () => {
  let component: AccountNotebooksComponent;
  let fixture: ComponentFixture<AccountNotebooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNotebooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
