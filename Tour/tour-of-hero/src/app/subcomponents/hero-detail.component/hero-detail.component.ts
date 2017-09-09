import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HeroService} from '../../servies/hero.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html',
    providers: [HeroService],
    styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

    @Input() hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        /**
         * The hero id is a number. Route parameters are always strings.
         * So the route parameter value is converted to a number with the JavaScript (+) operator.
         */
        this.route.paramMap
            .switchMap((param: ParamMap) => this.heroService.getHero(+param.get('id')))
            .subscribe(hero => this.hero = hero);
    }

    /**
     *  navigates backward one step in the browser's history stack
     */
    goBack() {
        this.location.back();
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
}
