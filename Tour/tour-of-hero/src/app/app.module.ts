import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeroesComponent } from './subcomponents/heroes.component/heroes.component';
import {HeroDetailComponent} from './subcomponents/hero-detail.component/hero-detail.component';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DashboardComponent} from './subcomponents/dashboard.component/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';

import { InMemoryDataService } from './in-memory-data.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { HeroSearchComponent } from './subcomponents/hero-search/hero-search.component';

@NgModule({
  declarations: [
      AppComponent,
      HeroesComponent,
      HeroDetailComponent,
      DashboardComponent,
      HeroSearchComponent,
  ],
  imports: [
    BrowserModule,
      FormsModule,
      AppRoutingModule,
      InMemoryWebApiModule.forRoot(InMemoryDataService),
      HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
