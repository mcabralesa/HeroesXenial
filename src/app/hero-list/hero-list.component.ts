import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Hero} from '../hero';
import {Observable} from 'rxjs/Observable';
import {HeroListService} from "./hero-list.service";
import {AppState} from "../AppState";

@Component({
    selector: 'hero-list',
    templateUrl: './hero-list.component.html',
    providers: [HeroListService]
})
export class HeroListComponent implements OnInit {

    heroesNgrx$: Observable<Hero[]>;

    constructor(private store: Store<AppState>, private service: HeroListService) {
        this.heroesNgrx$ = this.store.select(state => state.heroes);
    }


    ngOnInit() {

        this.heroesNgrx$.subscribe(result => {
            if (result.length === 0) {
                this.service.getHeroes()
                    .subscribe(data => {
                    this.store.dispatch({type: 'ADD_ALL', payload: <Hero[]> data});
                });
            }
        });


    }
}