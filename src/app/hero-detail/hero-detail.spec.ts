import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../AppState";
import {heroesReducer} from "../heroes.reducer";
import {HeroListComponent} from "../hero-list/hero-list.component";
import {ActivatedRoute, RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const appRoutes: Routes = [
    {
        path: 'heroesList',
        component: HeroListComponent
    },
    {
        path: 'heroDetail/:index',
        component: HeroDetailComponent
    },
    {
        path: '**',
        redirectTo: '/heroesList',
        pathMatch: 'full'
    }
];


describe('WelcomeComponent (class only)', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let store: Store<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            imports: [ FormsModule,
                StoreModule.forRoot({heroes: heroesReducer}),
                RouterModule.forRoot(appRoutes, {enableTracing: true, useHash: true})]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        component = TestBed.get(HeroDetailComponent);

    });
    //
    // beforeEach(() => {
    //     fixture = TestBed.createComponent(HeroDetailComponent);
    //     component = fixture.componentInstance;
    //     store = fixture.debugElement.injector.get(Store);
    //     // store.dispatch({
    //     //     type: ACTIONS.LOAD_DATA,
    //     //     payload: {
    //     //         demoSlice: tableData
    //     //     }
    //     // });
    // });



    it('should not have welcome message after construction', () => {
        expect(component.index).toBeUndefined();
    });

    // it('should welcome logged in user after Angular calls ngOnInit', () => {
    //     comp.ngOnInit();
    //     expect(comp.welcome).toContain(userService.user.name);
    // });
    //
    // it('should ask user to log in if not logged in after ngOnInit', () => {
    //     userService.isLoggedIn = false;
    //     comp.ngOnInit();
    //     expect(comp.welcome).not.toContain(userService.user.name);
    //     expect(comp.welcome).toContain('log in');
    // });
    // #enddocregion class-only-tests
});

