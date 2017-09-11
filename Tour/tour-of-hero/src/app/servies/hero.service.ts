import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

// import {Observable} from "rxjs/Observable";
 @Injectable()
export class HeroService {

     getOptions() {
         let header = new Headers({ 'Content-Type': 'application/json'});
         return new RequestOptions({ headers: header });
     }
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

     //更新数据
     update(hero: Hero): Promise<Hero> {
         const url = `${'/api/index/update'}/${hero.id}`;

         return this.http
             .put(url, JSON.stringify(hero), this.getOptions())
             .toPromise()
             .then(() => hero)
             .catch(this.handleError);
     }
     // 新增数据
     create(name: string): Promise<Hero> {
         return this.http
             .post('/api/index/add', JSON.stringify({name: name}), this.getOptions())
             .toPromise()
             .then(res => res.json().data as Hero)
             .catch(this.handleError);
     }

     delete(id: number): Promise<void> {
         const url = `${'/api/index/delete'}/${id}`;
         return this.http.delete(url, this.getOptions())
             .toPromise()
             .then(() => null)
             .catch(this.handleError);
     }
}
