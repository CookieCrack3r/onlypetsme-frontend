import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitorsComponent } from './profile-visitors.component';

describe('ProfileVisitorsComponent', () => {
  let component: ProfileVisitorsComponent;
  let fixture: ComponentFixture<ProfileVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileVisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
