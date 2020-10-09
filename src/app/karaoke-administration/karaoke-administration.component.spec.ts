import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeAdministrationComponent } from './karaoke-administration.component';

describe('KaraokeAdministrationComponent', () => {
  let component: KaraokeAdministrationComponent;
  let fixture: ComponentFixture<KaraokeAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaraokeAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
