import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {HeroesComponent} from "./hero.component";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";


describe('Hero Component', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;


    beforeEach(() => {
        //params = new Subject<Params>();
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            //providers: [{provide: ActivatedRoute, useValue: {params: params}}],
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes([])]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
    });

    it('Should Load de component', () => {
        expect(component).toBeDefined();
    });

    it('Should load Data', fakeAsync(() => {
        component.hero = {
            "_name": "Anthony Stark",
            "_height": 6.1,
            "_picture": "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg",
            "_nickname": "Iron Man"
        };
        component.index = 1;
        fixture.detectChanges();
        tick();
        let indexEl = fixture.debugElement.query(By.css('.index'));
        expect(indexEl.nativeElement.innerText).toBe('1th');
        let nameEl = fixture.debugElement.query(By.css('#name'));
        expect(nameEl.nativeElement.innerText).toBe('Anthony Stark');
        let nicknameEl = fixture.debugElement.query(By.css('.nickname'));
        expect(nicknameEl.nativeElement.innerText).toBe('Iron Man');
        let heightEl = fixture.debugElement.query(By.css('#height'));
        expect(heightEl.nativeElement.innerText).toBe('Estatura: 6.1');
    }));
});

