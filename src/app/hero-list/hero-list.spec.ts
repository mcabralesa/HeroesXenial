import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {HeroListComponent} from "./hero-list.component";
import {Store, StoreModule} from "@ngrx/store";
import {heroesReducer} from "../reducers/heroes.reducer";
import {HeroListService} from "./hero-list.service";
import {AppState} from "../commons/AppState";
import {Hero} from "../commons/hero";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HeroesComponent} from "../hero/hero.component";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";


describe('Hero List Component', () => {
    let component: HeroListComponent;
    let fixture: ComponentFixture<HeroListComponent>;
    let store: Store<AppState>;
    let heroListService: HeroListService;
    let mockItems: Hero[];
    let spy;

    beforeEach(() => {
        //params = new Subject<Params>();
        TestBed.configureTestingModule({
            declarations: [HeroListComponent, HeroesComponent],
            providers: [HeroListService],
            //providers: [{provide: HeroListService, useClass: MockHeroListService}],
            imports: [FormsModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([]),
                StoreModule.forRoot({heroes: heroesReducer})
            ]
        });
        fixture = TestBed.createComponent(HeroListComponent);
        component = fixture.componentInstance;
        store = fixture.debugElement.injector.get(Store);
        heroListService = fixture.debugElement.injector.get(HeroListService);

        mockItems = [
            {
                "_name": "Anthony Stark",
                "_height": 6.1,
                "_picture": "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg",
                "_nickname": "Iron Man"
            }
        ];

        spy = spyOn(heroListService, 'getHeroes').and.returnValue(Observable.of<Hero[]>(mockItems));

    });

    it('Should Load de component', () => {
        expect(component).toBeDefined();
    });

    it('Should Load Data from service into store', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        component.heroesNgrx$.subscribe(results => {
            expect(results.length).toBe(1);
        });
    }));
});

