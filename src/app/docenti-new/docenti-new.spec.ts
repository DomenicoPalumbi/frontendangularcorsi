import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentiNew } from './docenti-new';

describe('DocentiNew', () => {
  let component: DocentiNew;
  let fixture: ComponentFixture<DocentiNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentiNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocentiNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
