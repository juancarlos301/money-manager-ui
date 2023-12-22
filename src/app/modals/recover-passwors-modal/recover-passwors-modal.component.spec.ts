import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPassworsModalComponent } from './recover-passwors-modal.component';

describe('RecoverPassworsModalComponent', () => {
  let component: RecoverPassworsModalComponent;
  let fixture: ComponentFixture<RecoverPassworsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverPassworsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoverPassworsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
