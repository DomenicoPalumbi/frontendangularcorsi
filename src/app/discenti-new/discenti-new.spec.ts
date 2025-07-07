import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscentiNew } from './discenti-new';

describe('DiscentiNew', () => {
  let component: DiscentiNew;
  let fixture: ComponentFixture<DiscentiNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscentiNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscentiNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
