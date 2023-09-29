import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPrivilegeComponent } from './profil-privilege.component';

describe('ProfilPrivilegeComponent', () => {
  let component: ProfilPrivilegeComponent;
  let fixture: ComponentFixture<ProfilPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilPrivilegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
