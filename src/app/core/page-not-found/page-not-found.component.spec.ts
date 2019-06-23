import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    });

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "Page not found"', ()=> {
    const signinElement: HTMLElement = fixture.nativeElement;
    const p = signinElement.querySelector('p');
    expect(p.textContent).toContain('Page not found');
  })
});
