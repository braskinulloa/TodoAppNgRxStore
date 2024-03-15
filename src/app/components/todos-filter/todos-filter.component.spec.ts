import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosFilterComponent } from './todos-filter.component';

describe('TodosFilterComponent', () => {
  let component: TodosFilterComponent;
  let fixture: ComponentFixture<TodosFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
