import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {AppState} from "../AppState";

@Component({
    moduleId: module.id,
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {

    heroes: Observable<Hero[]>;
    index: number;

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {

        this.heroes = this.store.select(state => state.heroes);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.index = +params['index']; 
            this.index--;
         });
    }

}