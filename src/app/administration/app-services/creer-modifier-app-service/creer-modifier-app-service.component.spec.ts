import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierAppServiceComponent } from './creer-modifier-app-service.component';

describe('CreerModifierAppServiceComponent', () => {
  let component: CreerModifierAppServiceComponent;
  let fixture: ComponentFixture<CreerModifierAppServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModifierAppServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerModifierAppServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
