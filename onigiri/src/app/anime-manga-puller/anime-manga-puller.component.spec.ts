import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeMangaPullerComponent } from './anime-manga-puller.component';

describe('AnimeMangaPullerComponent', () => {
  let component: AnimeMangaPullerComponent;
  let fixture: ComponentFixture<AnimeMangaPullerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeMangaPullerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeMangaPullerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
