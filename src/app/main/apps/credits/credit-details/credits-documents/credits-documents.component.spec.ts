import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsDocumentsComponent } from './credits-documents.component';

describe('CreditsDocumentsComponent', () => {
  let component: CreditsDocumentsComponent;
  let fixture: ComponentFixture<CreditsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
