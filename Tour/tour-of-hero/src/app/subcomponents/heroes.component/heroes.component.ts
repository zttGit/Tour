import {Component, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../servies/hero.service';
import {Router} from '@angular/router';
@Component({
  selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    providers: [HeroService],
    styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    /**
     * router: Router;
       heroService: HeroService;
       constructor( heroService: HeroService, router: Router ) {
        this.heroService = heroService;
        this.router = router;
       }
     */
    // constructor的简写
    /**
     * 在使用public关键字的时候，TypeScript会将heroService赋值给this.heroService,
     * 它是上面注释部分的简写
     * @param {HeroService} heroService
     * @param {Router} router
     */
    constructor(private heroService: HeroService, private router: Router) {}
    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }
    getHeroes() {
        // this.heroes = this.heroService.getHeroes();  // Old
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);   // New

    }
    ngOnInit() {
        this.getHeroes();
    }
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }


}
