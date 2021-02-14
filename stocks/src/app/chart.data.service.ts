import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ChartDataService
{
  apikey = '810AMVHGA050E9HY';
  keys=['NYL2E9I01SVK961B','810AMVHGA050E9HY'];
  lastChart = null;
  mode=0;

  constructor(private http:  HttpClient)
  {

  }

  createChart(container, symbol, data = null)
  { console.log("in createchart");
  
    let options: any = this.transformConfiguration(symbol, data);
    let {lastChart} = this;

    if(options.chart != null)
    {
      options.chart['renderTo'] = container;
    }
    else
    {
      options.chart = {
        'renderTo': container
      };
    }

    if(lastChart != null)
    {
      lastChart.destroy();
    }

    lastChart = new Highcharts.Chart(options);
  }

  /**
  * Retrieve Chart Intra Day
  */
  chartIntraDay(symbol, data)
  { console.log("in chartintraday");
    var config = {
      chart: { type: 'spline' },
      title : { text : symbol },
      xAxis: {
          type: 'datetime'
      },
      series: [{
        name: symbol,
        data: data
      }],
      rangeSelector: {
          buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
          }, {
              type: 'day',
              count: 1,
              text: '1D'
          }, {
              type: 'all',
              count: 1,
              text: 'All'
          }],
          selected: 1,
          inputEnabled: true
      }
    };

    return config;
  };

  transformConfiguration(symbol, data)
  { console.log("in transformconfiguration");
    let chartConfig = this.chartIntraDay(symbol, data);
    
    return chartConfig;
  };

  createStockQuery(tickerSymbol, mode)
  { console.log("in createstockquery");
    this.mode=mode;
    if(mode==1){
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + tickerSymbol + '&interval=5min&apikey=' + this.apikey;
    }
    if(mode==2){
      var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=' + tickerSymbol + '&interval=30min&slice=year2month12&apikey=' + this.apikey;
    }
    if(mode==3){
      var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + tickerSymbol + '&apikey=' + this.apikey;
    }
    if(mode==4){
      var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=' + tickerSymbol + '&apikey=' + this.apikey;
    }
    if(mode==5){
      var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + tickerSymbol + '&apikey=' + this.apikey;
    }
    return encodeURI( url );
  };

  loadData(symbol, mode, callback)
  { console.log("in loaddata"+mode);
    this.http.get(this.createStockQuery(symbol, mode)).subscribe(this.onDataReceived.bind( this , symbol, callback));
  };

  onDataReceived(symbol, callback, rawData )
  { console.log("in loaddatarecieved"+this.mode);
    var highchartsData = this.transformDataForHighCharts( rawData );

    callback(symbol, highchartsData);

  };

  transformDataForHighCharts( rawData )
  {   if(rawData['Error Message']!=null){
        alert('task failed. Please retry.');
        if(this.apikey=="NYL2E9I01SVK961B"){
          this.apikey="810AMVHGA050E9HY";
          console.log(this.apikey);
        }
        else{
          this.apikey="NYL2E9I01SVK961B";
          console.log(this.apikey);
        }
  }
    console.log("in transformdataforhighcharts");
    if(this.mode==1){var quotes = rawData['Time Series (5min)'],
      data = [],
      i, item;}
    if(this.mode==2){var quotes = rawData['Time Series (30min)'],
      data = [],
      i, item;}
    if(this.mode==3){var quotes = rawData['Time Series (Daily)'],
      data = [],
      i, item;}
    if(this.mode==4){var quotes = rawData['Weekly Adjusted Time Series'],
      data = [],
      i, item;}
      if(this.mode==5){var quotes = rawData['Monthly Adjusted Time Series'],
      data = [],
      i, item;}


    for (var each in quotes)
    {
      item = quotes[each];

      data.push([new Date(each).getTime(),
        parseFloat(item["4. close"])]);
    }
    console.log(rawData)
    return data;
  };

}