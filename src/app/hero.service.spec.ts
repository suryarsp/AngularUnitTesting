import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
describe('Hero Service', () => {
let mockMessageService;
let service: HeroService;
let httpTestingController: HttpTestingController;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService
        }]
    });
    // Look inside DI registry module and find modules that corelates to that type
  httpTestingController = TestBed.get(HttpTestingController);
  service = TestBed.get(HeroService);
  });

  describe('getHero', () => {

      it('should call get with the correct url', () => {

        service.getHero(4).subscribe();

        const request = httpTestingController.expectOne('api/heroes/4');
        request.flush({id: 4, name: 'SuperDude', strength: 100});
        httpTestingController.verify();
      });
  });

});
