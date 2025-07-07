import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Discenti } from './discenti';

describe('Discenti', () => {
  let component: Discenti;
  let fixture: ComponentFixture<Discenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Discenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Discenti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
