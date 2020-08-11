import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistItemAddComponent } from './wishlist-item-add.component';

describe('WishlistItemAddComponent', () => {
  let component: WishlistItemAddComponent;
  let fixture: ComponentFixture<WishlistItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
