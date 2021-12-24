import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsListBySocioComponent } from './credits-list-by-socio.component';

describe('CreditsListBySocioComponent', () => {
  let component: CreditsListBySocioComponent;
  let fixture: ComponentFixture<CreditsListBySocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsListBySocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsListBySocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
