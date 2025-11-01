import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ RouterModule import added

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';
import { SearchComponent } from './components/search/search.component';
import { WeatherChartComponent } from './components/weather-chart/weather-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CityDetailComponent,
    SearchComponent,
    WeatherChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,

    // ✅ Add this line so <router-outlet> works
    RouterModule.forRoot([]) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

