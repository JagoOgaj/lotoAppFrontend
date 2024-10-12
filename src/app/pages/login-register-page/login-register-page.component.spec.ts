import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegisterPageComponent } from './login-register-page.component';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { LoginFormComponent } from '../../shared/login-form/login-form.component';
import { RegisterFormComponent } from '../../shared/register-form/register-form.component';

describe('LoginRegisterPageComponent', () => {
  let component: LoginRegisterPageComponent;
  let fixture: ComponentFixture<LoginRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginRegisterPageComponent,
        FooterSharedComponent,
        NavbarSharedComponent,
        LoginFormComponent,
        RegisterFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterPageComponent);
    component = fixture.componentInstance;

    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with login as the active tab', () => {
    expect(component.activeTab).toBe('login');
  });

  it('should scroll to the top on init', () => {
    component.ngOnInit();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should switch to register tab when selectTab is called with "register"', () => {
    component.selectTab('register');
    expect(component.activeTab).toBe('register');
  });

  it('should switch to login tab when selectTab is called with "login"', () => {
    component.selectTab('login');
    expect(component.activeTab).toBe('login');
  });

  it('should change active tab based on changeTab event', () => {
    component.changeTab('register');
    expect(component.activeTab).toBe('register');

    component.changeTab('login');
    expect(component.activeTab).toBe('login');
  });
});
