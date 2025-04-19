import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableAreaComponent } from './editable-area.component';

describe('EditableAreaComponent', () => {
  let component: EditableAreaComponent;
  let fixture: ComponentFixture<EditableAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
