import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpirationComponent } from './token-expiration.component';

describe('TokenExpirationComponent', () => {
  let component: TokenExpirationComponent;
  let fixture: ComponentFixture<TokenExpirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenExpirationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
