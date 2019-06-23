import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../auth/auth.service';
import { AuthState, authReducer } from '../../auth/store/auth.reducers';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;
    let authServiceStub: Partial<AuthService>;
    let authService: AuthService;
    let authStore: Store<AuthState>;
    let button: HTMLElement;

    beforeEach(() => {
        // stub AuthService for test purposes
        authServiceStub = {
            isAuthenticated: true
        };

        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                StoreModule.forRoot({ auth: authReducer }),
                // StoreModule.forRoot({}),
                // StoreModule.forFeature('auth', authReducer)
            ],
            declarations: [HeaderComponent],
            // provide a test-double instead of real services
            providers: [
                { provide: AuthService, useValue: authServiceStub },
            ]
        });

        authStore = TestBed.get(Store);
        spyOn(authStore, 'dispatch').and.callThrough();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance; // HeaderComponent test instance

        // get the service from the component's injector (safe way, always work):
        authService = fixture.debugElement.injector.get(AuthService);

        // get the service from root injector:
        // authService = TestBed.get(AuthService);
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should contain "Sign out" if signed in', () => {
        // call detectChange() to render *ngIf block
        fixture.detectChanges();

        button = fixture.nativeElement.querySelector('button.white-border');
        // the DebugElement offers query methods that work for all supported platforms
        // button = fixture.debugElement.query(By.css('button.white-border')).nativeElement;

        expect(button.textContent).toContain('Sign out');
    });

    it('should contain "Sign up" if not signed in', () => {
        // do not call detectChange() before setting authService.isAuthenticated
        authService.isAuthenticated = false;

        // call detectChange() to render *ngIf block & update isAuthenticated
        fixture.detectChanges();
        
        button = fixture.nativeElement.querySelector('button.white-border');
        // button = fixture.debugElement.query(By.css('button.white-border')).nativeElement;
        
        expect(button.textContent).toContain('Sign up');
    });

});
