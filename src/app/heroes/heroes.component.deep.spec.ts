import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA, Directive, HostListener } from '@angular/core';
import { HeroService } from '../hero.service';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
 // tslint:disable-next-line:directive-selector
 selector: '[routerLink]',
 // tslint:disable-next-line:use-host-property-decorator
 host: { '(click)': 'onClick()'},
})

 // tslint:disable-next-line:directive-class-suffix
 export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }

}

describe('Heroes Component (deep test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;


  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [
      HeroesComponent,
      HeroComponent,
      RouterLinkDirectiveStub
      ],
      providers: [
      {
        provide: HeroService,
        useValue: mockHeroService
      }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponetDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponetDEs.length).toEqual(3);
    heroComponetDEs.forEach((DE, index) => {
      expect(DE.componentInstance.hero).toEqual(HEROES[index]);
    });
  });

  it(`should call heroService.deleteHero when HeroComponent's delete
   button is clicked`, () => {
      spyOn(fixture.componentInstance, 'delete');
      mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // (<HeroComponent>heroComponents[0].componentInstance).delete.next();
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
   });


  it('should add a new hero to hero list when add button is clicked', () => {
     mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    // create a dummy name and trigger that value via input
    const name = 'Iron Name';
    mockHeroService.addHero.and.returnValue(of({id : 5, name, strength: 4} as Hero));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    // trigger and make those changes
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

   const heroText =  fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
   expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    // Arrange
    const heroComponents = fixture.debugElement .queryAll(By.directive(HeroComponent));
    let routerLink  = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

    // Act
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    // Assert
    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
