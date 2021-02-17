import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StockSymbol } from "../models/stocksymbol";
import { symb } from './US-Stock-Symbols'
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})

export class StocklistComponent implements OnInit
{
	@Output() selectedStockSymbol = new EventEmitter<StockSymbol>();
	sym=(new symb()).symbs;
	private changeInterval: number = 5000;
	apikey = '810AMVHGA050E9HY';
	public symbols: StockSymbol[] = [
		new StockSymbol("FB", "FB", 0, 0, 0, 0, 0, 0, 0, 0),
		new StockSymbol("BABA", "BABA", 0, 0, 0, 0, 0, 0, 0, 0),
		new StockSymbol("AMZN", "AMZN", 0, 0, 0, 0, 0, 0, 0, 0),
		new StockSymbol("NFLX", "NFLX", 0, 0, 0, 0, 0, 0, 0, 0),
		new StockSymbol("GOOG", "GOOG", 0, 0, 0, 0, 0, 0, 0, 0),
		new StockSymbol("MRNA", "MRNA", 0, 0, 0, 0, 0, 0, 0, 0),
	];
	mycontrol=new FormControl();
  filteredOptions: Observable<string[]>;


	constructor(private cdr: ChangeDetectorRef, private http: HttpClient) { }

	ngOnInit()
	{	this.filteredOptions = this.mycontrol.valueChanges.pipe(
		startWith(''),
		map(value => this._filter(value))
	  );
	  this.http.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FB&apikey=810AMVHGA050E9HY').subscribe((res)=>{
			console.log(res);
			this.symbols[0].change=res['Global Quote']["09. change"];
			this.symbols[0].open=res['Global Quote']["02. open"];
			this.symbols[0].high=res['Global Quote']["03. high"];
			this.symbols[0].low=res['Global Quote']["04. low"];
			this.symbols[0].price=res['Global Quote']["05. price"];
			this.symbols[0].prev_close=res['Global Quote']["08. previous close"];
			this.symbols[0].volume=res['Global Quote']["06. volume"];
			this.symbols[0].percent_change=res['Global Quote']["10. change percent"];
		});
	}
	private _filter(value: string): string[] {
	  const filterValue = value.toLowerCase();
  
	  return this.sym.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}
	addcompany(){
		var temp=new StockSymbol(this.mycontrol.value, this.mycontrol.value, 0,0,0,0,0,0,0,0);
		this.http.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+this.mycontrol.value +'&apikey=810AMVHGA050E9HY').subscribe((res)=>{
			console.log(res);
			temp.change=res['Global Quote']["09. change"];
			temp.open=res['Global Quote']["02. open"];
			temp.high=res['Global Quote']["03. high"];
			temp.low=res['Global Quote']["04. low"];
			temp.price=res['Global Quote']["05. price"];
			temp.prev_close=res['Global Quote']["08. previous close"];
			temp.volume=res['Global Quote']["06. volume"];
			temp.percent_change=res['Global Quote']["10. change percent"];
			this.symbols.push(temp);
		});
		this.mycontrol.setValue('');
	}

	ngAfterViewInit()
	{
		this.cdr.detach();

		/* execute change interval every so often as based on change configuration */
		if(this.changeInterval > 0)
		{
			setInterval(() => {
				this.update();

			}, this.changeInterval);
		}
	}

	/**
	* The update method will control the change detection. Component will update only when change detection is called.
	*/

	
	update()
	{
		this.cdr.detectChanges();
	}

	onStockSymbolSelected(symbol: StockSymbol)
	{
		this.selectedStockSymbol.emit(symbol);
	}
}
