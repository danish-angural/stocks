export class StockSymbol
{
  id: string;
  title: string;
  price: number;
  change: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  prev_close: number;
  percent_change: number;
  
  constructor(id: string, title: string, price: number, change: number,open: number, high: number,low: number, volume: number, prev_close: number, percent_change: number )
  {
    this.id = id;
    this.title = title;
    this.price = price;
    this.change = change;
    this.high = high;
    this.low = low;
    this.volume = volume;
    this.prev_close = prev_close;
    this.open = open;
    this.percent_change = percent_change;
  }
}
