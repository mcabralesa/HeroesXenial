import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState} from "../AppState";

@Component({
    moduleId: module.id + '',
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {

    heroes: Observable<Hero[]>;
    _nickname: string;
    _name: string;
    _height: number;
    _picture: string;
    index: number;

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    }

    ngOnInit() {
        this.heroes = this.store.select(state => state.heroes);
        this.route.params.subscribe(params => {
            this.index = +params['index'];
            this.index--;
            this.heroes.subscribe(response => {
                this._nickname = response[this.index]._nickname;
                this._name = response[this.index]._name;
                this._height = response[this.index]._height;
                this._picture = response[this.index]._picture;

            });
        });
    }

}