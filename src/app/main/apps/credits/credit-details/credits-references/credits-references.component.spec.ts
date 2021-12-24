import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsReferencesComponent } from './credits-references.component';

describe('CreditsReferencesComponent', () => {
  let component: CreditsReferencesComponent;
  let fixture: ComponentFixture<CreditsReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
