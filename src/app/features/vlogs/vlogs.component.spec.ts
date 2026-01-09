import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlogsComponent } from './vlogs.component';

describe('VlogsComponent', () => {
  let component: VlogsComponent;
  let fixture: ComponentFixture<VlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
