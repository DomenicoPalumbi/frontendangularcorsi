import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorpheusPillsComponent } from './morpheuspillscomponent';

describe('Morpheuspillscomponent', () => {
  let component: MorpheusPillsComponent;
  let fixture: ComponentFixture<MorpheusPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MorpheusPillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorpheusPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
