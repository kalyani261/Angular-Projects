import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipesDetailsComponent } from './receipes-details.component';

describe('ReceipesDetailsComponent', () => {
  let component: ReceipesDetailsComponent;
  let fixture: ComponentFixture<ReceipesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
