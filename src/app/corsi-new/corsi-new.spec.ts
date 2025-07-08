import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsiNew } from './corsi-new';

describe('CorsiNew', () => {
  let component: CorsiNew;
  let fixture: ComponentFixture<CorsiNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorsiNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorsiNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
