import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { authState, authStateSpy } from '../global/auth.state';
import { oktaProvider, testImports } from '../global/test.global';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginResponse: any = {
    response: {
      user: {
        userName: '',
        email: '',
        roles: [
          { roleName: 'ADMIN'},
          { roleName: 'CUSTOMER'}
        ]
      },
      jwtToken: 'testtoken'
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: testImports,
      providers: [ 
        ...oktaProvider
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {    
    (Object.getOwnPropertyDescriptor(authStateSpy, 'authState$')?.get as jasmine.Spy).and.returnValue(of({authState}));
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow valid input', () => {
    // TODO add
  });

  it ('should reject invalid input', () => {
    // TODO add
  })
});
