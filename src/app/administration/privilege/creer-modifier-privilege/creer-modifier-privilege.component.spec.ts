import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierPrivilegeComponent } from './creer-modifier-privilege.component';

describe('CreerModifierPrivilegeComponent', () => {
  let component: CreerModifierPrivilegeComponent;
  let fixture: ComponentFixture<CreerModifierPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierPrivilegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
