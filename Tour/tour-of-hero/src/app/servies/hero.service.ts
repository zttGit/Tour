import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// import {Observable} from "rxjs/Observable";
 @Injectable()
export class HeroService {

     private heroesUrl = '/api/index/query';  // URL to web api

     constructor(private http: Http) { }

     getHero(id: number): Promise<Hero> {
         const url = `${'/api/index/queryById'}/${id}`;
         return this.http.get(url)
             .toPromise()
             .then(response => response.json() as Hero)
             .catch(this.handleError);
     }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)  // http.get returns an RxJS Observable
            .toPromise()     // converted the Observable to a Promise using the toPromise operator
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }

    // 处理错误
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
     private headers = new Headers({'Content-Type': 'application/json'});

     update(hero: Hero): Promise<Hero> {
         const url = `${this.heroesUrl}/${hero.id}`;
         return this.http
             .put(url, JSON.stringify(hero), )
             .toPromise()
             .then(() => hero)
             .catch(this.handleError);
     }
}
