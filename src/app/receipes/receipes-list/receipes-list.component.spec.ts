import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipesListComponent } from './receipes-list.component';

describe('ReceipesListComponent', () => {
  let component: ReceipesListComponent;
  let fixture: ComponentFixture<ReceipesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
