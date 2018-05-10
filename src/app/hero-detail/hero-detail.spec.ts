import {async, ComponentFixture, TestBed, tick} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../AppState";
import {heroesReducer} from "../heroes.reducer";
import {ActivatedRoute, Params} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {Hero} from "../hero";


describe('Hero Detail Component', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let params: Subject<Params>;
    let store: Store<AppState>;
    let tableData : Hero[];
    tableData = [
        {
            "_name": "Anthony Stark",
            "_height": 6.1,
            "_picture": "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg",
            "_nickname": "Iron Man"
        }
    ];

    beforeEach(() => {
        params = new Subject<Params>();
        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            providers: [{provide: ActivatedRoute, useValue: {params: params}}],
            imports: [FormsModule,
                StoreModule.forRoot({heroes: heroesReducer})
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        store = fixture.debugElement.injector.get(Store);
        store.dispatch({ type: 'ADD_ALL', payload: <Hero[]> tableData});
    });

    it('Should Load de component', () => {
        expect(component).toBeDefined();
    });

    it('store to be defined', async(() => {
        expect(store).toBeDefined();
    }));

    it('Params index should be establish', async(() => {
        fixture.detectChanges();
        params.next({ 'index': 1 });
        tick();
        expect(component.index).toBe(0);
    }));


});

