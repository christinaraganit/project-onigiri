import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountAddToListComponent } from './new-account-add-to-list.component';

describe('NewAccountAddToListComponent', () => {
  let component: NewAccountAddToListComponent;
  let fixture: ComponentFixture<NewAccountAddToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAccountAddToListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountAddToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
