import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierProfilComponent } from './creer-modifier-profil.component';

describe('CreerModifierProfilComponent', () => {
  let component: CreerModifierProfilComponent;
  let fixture: ComponentFixture<CreerModifierProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
