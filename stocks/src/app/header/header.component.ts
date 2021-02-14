import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StockSymbol } from '../models/stocksymbol';
import { StockbodyComponent } from '../stockbody/stockbody.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	
  constructor() { }
  
  ngOnInit() {
  }
}
