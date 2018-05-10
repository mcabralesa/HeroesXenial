import {Component, OnInit, Input} from '@angular/core';
import {Hero} from '../hero';
import { Router } from '@angular/router';

@Component({
    selector: 'hero',
    templateUrl: './hero.component.html'
})
export class HeroesComponent implements OnInit {

    @Input() hero: Hero;
    @Input() index: number;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    clickHero() {
        this.router.navigate(['heroDetail', this.index]);
    }

}