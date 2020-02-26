import { TestBed, ComponentFixture } from '@angular/core/testing'
import { HeroComponent } from './hero.component'
import { AppRoutingModule } from '../app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('Hero Component (shallow test)', () => {
  let  fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 3
    };

    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });


  it('should render the hero name and anchor tag', () => {
    // Act
    fixture.componentInstance.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 3
    };

    // Need to run to bind values on HTML
    fixture.detectChanges();


    // Assert
    const aTag = fixture.debugElement.query(By.css('a'));
    expect(aTag.nativeElement.textContent).toContain('SuperDude');
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
})
