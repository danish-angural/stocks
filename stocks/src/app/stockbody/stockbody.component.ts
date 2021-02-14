import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ChartDataService } from '../chart.data.service';
import * as Highcharts from 'highcharts';
import { StockSymbol } from "../models/stocksymbol";

@Component({
  selector: 'app-stockbody',
  templateUrl: './stockbody.component.html',
  styleUrls: ['./stockbody.component.css']
})

export class StockbodyComponent implements OnInit, AfterViewInit, OnDestroy
{
	@Input() symbol: StockSymbol;
	@ViewChild('charts') public chartEl: ElementRef;
	mode;
	symb;

	constructor(private hcs: ChartDataService)
	{
		this.mode=1;		
  	}

	changemode(num){
		console.log('changemode called mode='+this.mode+'\nsymbol='+this.symbol);
		
		this.mode=num;
		this.createChart(this.symb);
		
	}

	ngOnInit() {this.mode=1}

	ngAfterViewInit()
	{
		//this.createChart();
	}

	ngOnDestroy()
	{

	}

	createChart(symbol)
	{	console.log('mode='+this.mode);
		this.hcs.loadData(symbol, this.mode, (symbol, data)=> {
			this.hcs.createChart(this.chartEl.nativeElement, symbol, data);
		});
		this.symb=symbol;
	}
}