import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAppServiceComponent } from './details-app-service.component';

describe('DetailsAppServiceComponent', () => {
  let component: DetailsAppServiceComponent;
  let fixture: ComponentFixture<DetailsAppServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAppServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAppServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
