import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { StockListItemComponent } from './stocklist/stocklist-item/stocklist-item.component';
import { StockbodyComponent } from './stockbody/stockbody.component';
import { ChartDataService } from './chart.data.service'; 
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './news/news.component';
import { FutureComponent } from './future/future.component';
import { CompareComponent } from './compare/compare.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StocklistComponent,
    StockListItemComponent,
    StockbodyComponent,
    NewsComponent,
    FutureComponent,
    CompareComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'future', component: FutureComponent},
      {path: 'news', component: NewsComponent},
      {path: 'compare', component: CompareComponent},
      {path: '', component: HomeComponent}
    ]),
  ],
  providers: [ChartDataService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
