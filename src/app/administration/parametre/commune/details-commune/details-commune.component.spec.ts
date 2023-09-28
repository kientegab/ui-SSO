import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommuneComponent } from './details-commune.component';

describe('DetailsCommuneComponent', () => {
  let component: DetailsCommuneComponent;
  let fixture: ComponentFixture<DetailsCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCommuneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
