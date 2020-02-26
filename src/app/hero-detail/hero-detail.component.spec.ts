import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

let fixture: ComponentFixture<HeroDetailComponent>;
let mockActivatedRoute, mockHeroService, mockLocation;
describe('HeroDetailComponent', () => {

    beforeEach(() => {
      mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
      mockLocation = jasmine.createSpyObj(['back']);
      // tslint:disable-next-line:arrow-return-shorthand
      mockActivatedRoute = { snapshot: { paramMap: {get: () => { return '3'; }}}
      };


      TestBed.configureTestingModule({
        declarations: [HeroDetailComponent],
        imports: [FormsModule],
        providers: [
          {
            provide: HeroService,
            useValue: mockHeroService
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute
          },
          {
            provide: Location,
            useValue: mockLocation
          }
        ]
      });
      fixture = TestBed.createComponent(HeroDetailComponent);
      mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 3}));
    });

    it('should render the hero name in h2 tag', () => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('SUPERDUDE');
    });

    it('should call update hero when save is called', fakeAsync( () => {
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      fixture.componentInstance.save();
      flush();

      expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
    );

    //  it('should call update hero when save is called', async( () => {
    //   mockHeroService.updateHero.and.returnValue(of({}));
    //   fixture.detectChanges();

    //   fixture.componentInstance.save();
    //   fixture.whenStable().then(() => {
    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
    //   });
    // })
    //  );
});
