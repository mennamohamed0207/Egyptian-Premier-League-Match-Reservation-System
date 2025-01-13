import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationConfirmationDialogComponent } from './reservation-confirmation-dialog.component';

describe('ReservationConfirmationDialogComponent', () => {
  let component: ReservationConfirmationDialogComponent;
  let fixture: ComponentFixture<ReservationConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
