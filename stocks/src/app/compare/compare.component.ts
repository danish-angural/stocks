import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { stringify } from '@angular/compiler/src/util';
import { CdkTableExporterModule } from 'cdk-table-exporter';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent extends CdkTableExporterModule{

  constructor(private http: HttpClient, public dialog: MatDialog) {super(); }
  columnsToDisplay: string[] = ['prop'];
  data=[{prop: "Symbol"},{prop: "AssetType"},{prop: "Name"},{prop: "Description"},{prop: "Exchange"},{prop: "Currency"},{prop: "Country"},{prop: "Sector"},{prop: "Industry"},{prop: "Address"},{prop: "FullTimeEmployees"},{prop: "FiscalYearEnd"},{prop: "LatestQuarter"},{prop: "MarketCapitalization"},{prop: "EBITDA"},{prop: "PERatio"},{prop: "PEGRatio"},{prop: "BookValue"},{prop: "DividendPerShare"},{prop: "DividendYield"},{prop: "EPS"},{prop: "RevenuePerShareTTM"},{prop: "ProfitMargin"},{prop: "OperatingMarginTTM"},{prop: "ReturnOnAssetsTTM"},{prop: "ReturnOnEquityTTM"},{prop: "RevenueTTM"},{prop: "GrossProfitTTM"},{prop: "DilutedEPSTTM"},{prop: "QuarterlyEarningsGrowthYOY"},{prop: "QuarterlyRevenueGrowthYOY"},{prop: "AnalystTargetPrice"},{prop: "TrailingPE"},{prop: "ForwardPE"},{prop: "PriceToSalesRatioTTM"},{prop: "PriceToBookRatio"},{prop: "EVToRevenue"},{prop: "EVToEBITDA"},{prop: "Beta"},{prop: "52WeekHigh"},{prop: "52WeekLow"},{prop: "50DayMovingAverage"},{prop: "200DayMovingAverage"},{prop: "SharesOutstanding"},{prop: "SharesFloat"},{prop: "SharesShort"},{prop: "SharesShortPriorMonth"},{prop: "ShortRatio"},{prop: "ShortPercentOutstanding"},{prop: "ShortPercentFloat"},{prop: "PercentInsiders"},{prop: "PercentInstitutions"},{prop: "ForwardAnnualDividendRate"},{prop: "ForwardAnnualDividendYield"},{prop: "PayoutRatio"},{prop: "DividendDate"},{prop: "ExDividendDate"},{prop: "LastSplitFactor"},{prop: "LastSplitDate"}];

  addColumn(symbol) {
    let newdata;
    this.http.get("https://www.alphavantage.co/query?function=OVERVIEW&symbol="+symbol+"&apikey=810AMVHGA050E9HY").subscribe((res)=>{
      newdata=res;
      this.columnsToDisplay.push(newdata['Symbol']);
      var elem;
      var counter=0;
      for(elem in newdata){
        console.log(counter, elem);
        this.data[counter][newdata['Symbol']]=stringify(newdata[elem]).slice(0, 100);
        if(this.data[counter][newdata['Symbol']].length>=100)this.data[counter][newdata['Symbol']]=this.data[counter][newdata['Symbol']]+'...';
        counter++;
      }
      console.log(this.data, newdata, this.columnsToDisplay);
      
  });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {sym: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result){
      this.addColumn(result);
      }
    });
  }


  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {sym: string}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
