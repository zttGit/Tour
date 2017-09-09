import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './subcomponents/dashboard.component/dashboard.component';
import {HeroDetailComponent} from './subcomponents/hero-detail.component/hero-detail.component';
import {HeroesComponent} from './subcomponents/heroes.component/heroes.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
