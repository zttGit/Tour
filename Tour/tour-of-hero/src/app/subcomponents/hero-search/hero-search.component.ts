import { Component, OnInit } from '@angular/core';
import {HeroSearchService} from "../../servies/hero-search.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Hero} from "../../models/hero";
import {Router} from "@angular/router";

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
    providers:[HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

    heroes: Observable<Hero[]>;
    /**
     * heroes属性现在是英雄列表的Observable对象，而不再只是英雄数组
     * *ngFor不能用可观察对象做任何事，除非我们在它后面跟一个async pipe (AsyncPipe)。
     * 这个async管道会订阅到这个可观察对象，并且为*ngFor生成一个英雄数组。
     * @type {Subject<string>}
     */
    private searchTerms = new Subject<string>();

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) { }

    // Push a search term into the observable stream.把搜索字符加入到观察流中
    search(term: string): void {
        this.searchTerms.next(term);
        console.log("term的值为："+term);
    }

    ngOnInit():void {
      this.heroes = this.searchTerms
          .debounceTime(300)        // wait 300ms after each keystroke before considering the term
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term   // switch to new observable each time the term changes
              // return the http search observable
              ? this.heroSearchService.search(term)
              // or the observable of empty heroes if there was no search term
              : Observable.of<Hero[]>([]))
          .catch(error => {
              // TODO: add real error handling
              console.log("报错"+error);
              return Observable.of<Hero[]>([]);  // 返回一个包含空数组的可观察对象，以清空搜索结果。
          });
    }
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

}
