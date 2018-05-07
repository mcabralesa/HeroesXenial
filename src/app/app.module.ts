import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeroesComponent} from "./hero/hero.component";
import { StoreModule } from '@ngrx/store';
import { heroesReducer } from './heroes.reducer';
import { RouterModule, Routes} from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { FormsModule } from '@angular/forms';
import {HeroListService} from "./hero-list/hero-list.service";


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


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {enableTracing: true, useHash: true}),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        StoreModule.forRoot({heroes: heroesReducer})
    ],
    declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailComponent,
        HeroListComponent
    ],
    bootstrap: [AppComponent],
    providers: [HeroListService]
})
export class AppModule {
}