import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../commons/AppState";
import {heroesReducer} from "../reducers/heroes.reducer";
import {ActivatedRoute, Params} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {Hero} from "../commons/hero";
import {By} from "@angular/platform-browser";


describe('Hero Detail Component', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let params: Subject<Params>;
    let store: Store<AppState>;
    let tableData: Hero[];
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
        store.dispatch({type: 'ADD_ALL', payload: <Hero[]> tableData});
    });

    it('Should Load de component', () => {
        expect(component).toBeDefined();
    });

    it('store to be defined', async(() => {
        expect(store).toBeDefined();
    }));

    it('Params index should be establish and load hero', fakeAsync(() => {
        component.ngOnInit();
        params.next({'index': 1});
        expect(component.index).toBe(0);
        fixture.detectChanges();
        tick();
        let el = fixture.debugElement.query(By.css('#nickname'));
        expect(el.nativeElement.value).toBe('Iron Man');
    }));

});

