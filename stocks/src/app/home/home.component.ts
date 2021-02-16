import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StockSymbol } from '../models/stocksymbol';
import { StockbodyComponent } from '../stockbody/stockbody.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  title = 'charts6';

  @ViewChild(StockbodyComponent) stockbody: StockbodyComponent;

  symbolSelectedFromList(symbol: StockSymbol)
  {
  	this.stockbody.createChart(symbol.id);
  }
}
