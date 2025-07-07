import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Docenti } from './docenti';

describe('Docenti', () => {
  let component: Docenti;
  let fixture: ComponentFixture<Docenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Docenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Docenti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
