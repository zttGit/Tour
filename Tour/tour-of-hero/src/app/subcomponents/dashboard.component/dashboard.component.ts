import {Component, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../servies/hero.service';

@Component({
    selector: 'my-dashboard',
    template: `
        <h3>Top Heroes</h3>
        <div class="grid grid-pad">
            <a *ngFor="let hero of heroes" [routerLink]="['/detail',hero.id]" class="col-1-4">
                <div class="module hero">
                    <h4>{{hero.name}}</h4>
                </div>
            </a>
        </div>
    `,
    styleUrls: [ './dashboard.component.css' ],
    providers: [HeroService]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[];
    constructor(private heroService: HeroService) {}
    ngOnInit() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(0, 4));
    }
}
