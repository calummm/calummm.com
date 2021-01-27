import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsbobComponent } from './jsbob.component';

describe('JsbobComponent', () => {
  let component: JsbobComponent;
  let fixture: ComponentFixture<JsbobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsbobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsbobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
