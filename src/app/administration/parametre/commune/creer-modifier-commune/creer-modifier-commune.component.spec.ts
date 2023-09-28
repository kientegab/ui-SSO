import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierCommuneComponent } from './creer-modifier-commune.component';

describe('CreerModifierCommuneComponent', () => {
  let component: CreerModifierCommuneComponent;
  let fixture: ComponentFixture<CreerModifierCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierCommuneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
