import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistItemEditComponent } from './wishlist-item-edit.component';

describe('WishlistItemEditComponent', () => {
  let component: WishlistItemEditComponent;
  let fixture: ComponentFixture<WishlistItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
